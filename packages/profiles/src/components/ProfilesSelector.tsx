import React from 'react';
import { useTranslation } from '@ppe/translation';
import { Grid, Typography } from '@ppe/ui';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
  DroppableStateSnapshot,
  DraggableStateSnapshot,
  DroppableProvided,
  DraggableProvided,
} from 'react-beautiful-dnd';
import { IProfile } from '../types/IProfile';
import { ProfileButtonDraggable } from './ProfileButtonDraggable';
import { ITeam } from '@ppe/teams';

interface Props {
  data: IProfile[];
  initialSelected?: IProfile[];
  filter?: string;
  onChange?: (values: string[]) => void;
}

export const ProfilesSelector = ({ data = [], initialSelected = [], filter = '', onChange }: Props) => {
  const { t } = useTranslation();

  const [initialized, setInitialized] = React.useState(false);
  const [allItems, setAllItems] = React.useState<IProfile[]>(data);
  const [items, setItems] = React.useState<IProfile[]>(data);
  const [selected, setSelected] = React.useState<IProfile[]>([]);

  const getList = (id: string) => {
    if (id === 'droppable') return items;
    return selected;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const newOrder = reorder(getList(source.droppableId), source.index, destination.index);

      if (source.droppableId === 'droppable') {
        setItems(newOrder);
      }

      if (source.droppableId === 'droppable2') {
        setSelected(newOrder);
      }
    } else {
      const newOrder = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
      setItems(newOrder.droppable);
      setSelected(newOrder.droppable2);
      onChange?.(newOrder.droppable2.map((item) => item.id));
    }
  };

  React.useEffect(() => {
    if (initialSelected.length) {
      if (!initialized) {
        setInitialized(true);
        setItems([]);
      } else {
        const selectedIds = initialSelected.map((item) => item.id);
        const allProfiles = data.filter((item) => !selectedIds.includes(item.id));
        setItems(allProfiles);
      }
      setSelected(initialSelected);
    } else {
      setInitialized(true);
      setItems(data);
      setSelected([]);
    }
    setAllItems(data);
  }, [data]);

  React.useEffect(() => {
    if (!initialSelected.length || initialized) {
      const array = allItems.filter(
        (item) =>
          item.firstName.toLowerCase().indexOf(filter) > -1 ||
          item.lastName.toLowerCase().indexOf(filter) > -1 ||
          (item.team as ITeam).name.toLowerCase().indexOf(filter) > -1
      );
      const filtered = array.filter(({ id: id1 }) => !selected.some(({ id: id2 }) => id2 === id1));
      setItems(filtered);
    }
  }, [filter]);

  const removeSelected = (id: string) => {
    const profile = selected.find((item) => item.id === id);
    if (profile) {
      const newSelected = selected.filter((item) => item.id !== id);
      setSelected(newSelected);
      onChange?.(newSelected.map((item) => item.id));
      setItems([profile, ...items]);
    }
  };

  const addToSelected = (id: string) => {
    const profile = data.find((item) => item.id === id);
    if (profile) {
      const newSelected = [...selected, profile];
      onChange?.(newSelected.map((item) => item.id));
      setSelected(newSelected);
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ mt: 3 }}>
          {t('schedule.searchResults', 'Results: {{items}}', { items: items.length })}
        </Typography>
        <Typography variant="caption" sx={{ mt: 3 }}>
          {t('schedule.selected', 'Selected: {{selected}}', { selected: selected.length })}
        </Typography>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Droppable droppableId="droppable">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div ref={provided.innerRef} style={getListSourceStyle(snapshot.isDraggingOver)}>
                {items.map((item: IProfile, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(providedInner: DraggableProvided, snapshotInner: DraggableStateSnapshot) => (
                      <div
                        ref={providedInner.innerRef}
                        {...providedInner.draggableProps}
                        {...providedInner.dragHandleProps}
                        style={getItemStyle(snapshotInner.isDragging, providedInner.draggableProps.style)}
                      >
                        <ProfileButtonDraggable data={item} onClickAdd={addToSelected} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item xs={12} md={6}>
          <Droppable droppableId="droppable2">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div ref={provided.innerRef} style={getListTargetStyle(snapshot.isDraggingOver)}>
                {!selected.length ? (
                  <Typography variant="caption" style={{ fontStyle: 'italic', textAlign: 'center' }} component="div">
                    {t('schedule.dropHereSelected', 'Drag and drop here selected profiles')}
                  </Typography>
                ) : null}
                {selected.map((item: IProfile, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(providedInner: DraggableProvided, snapshotInner: DraggableStateSnapshot) => (
                      <div
                        ref={providedInner.innerRef}
                        {...providedInner.draggableProps}
                        {...providedInner.dragHandleProps}
                        style={getItemStyle(snapshotInner.isDragging, providedInner.draggableProps.style)}
                      >
                        <ProfileButtonDraggable data={item} onClickRemove={removeSelected} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default ProfilesSelector;

const reorder = (list: IProfile[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source: IProfile[], destination: IProfile[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: Record<string, IProfile[]> = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: React.CSSProperties | undefined) => ({
  padding: 0,
  marginBottom: '8px',
  ...draggableStyle,
});

const getListSourceStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#eeedfa' : '#fafafa',
  padding: '8px',
  width: '100%',
  height: '250px',
  overflow: 'auto',
});

const getListTargetStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#eeedfa' : 'white',
  padding: '8px',
  width: '100%',
  height: '250px',
  overflow: 'auto',
  border: 'solid black 2px',
  borderStyle: 'dashed',
});
