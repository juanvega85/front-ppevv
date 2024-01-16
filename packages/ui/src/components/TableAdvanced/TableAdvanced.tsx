/* eslint-disable camelcase */
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef as IColumn, MRT_Localization } from 'material-react-table';
import { useTranslation } from '@ppe/translation';
import { MRT_Localization_ES as es } from 'material-react-table/locales/es';
import { MRT_Localization_EN as en } from 'material-react-table/locales/en';

export interface Props {
  data: {}[];
  columns: IColumn<{}>[];
}

const translations: Record<string, MRT_Localization> = { es, en };

export const TableAdvanced = ({ data, columns, ...rest }: MaterialReactTableProps) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  return (
    <MaterialReactTable
      data={data}
      columns={columns}
      initialState={{ density: 'compact', pagination: { pageSize: 15, pageIndex: 0 } }}
      displayColumnDefOptions={{ 'mrt-row-actions': { header: '' } }}
      positionActionsColumn="last"
      localization={translations[language]}
      muiTablePaperProps={{ elevation: 0 }}
      {...rest}
    />
  );
};
