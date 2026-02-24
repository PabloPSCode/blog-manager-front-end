import { SortButton } from "@/components/buttons/SortButton";
import { SelectInput } from "@/components/inputs/SelectInput";
import { Subtitle } from "@/components/typography/Subtitle";
import { Text } from "@/components/typography/Text";
import { Title } from "@/components/typography/Title";
import { itemsPerPageOptions } from "@/data/placeholders";
import { IModule } from "@/interfaces/dtos/Module";
import { collapseLongString } from "@/utils/formats";
import { sortItems } from "@/utils/sorting";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import {
  MdEdit,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const TABLE_HEAD = [
  { label: "Módulo", propRef: "name" },
  { label: "Descrição", propRef: "description" },
  { label: "Curso", propRef: "course_name" },
  { label: "Duração", propRef: "duration" },
  { label: "Aulas", propRef: "total_classes" },
  { label: "Ações", propRef: "" },
];

interface ModulesTableProps {
  modules: IModule[];
  onUpdateModule: () => void;
  onDeleteModule: () => void;
}

export function ModulesTable({
  modules,
  onDeleteModule,
  onUpdateModule,
}: ModulesTableProps) {
  const [page, setPage] = useState(1);
  const [pagesListIndex, setPagesListIndex] = useState(0);
  const [sortedModules, setSortedModules] = useState<IModule[]>([]);
  const [tableData, setTableData] = useState<IModule[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(
    itemsPerPageOptions[0].value
  );

  const pages = Array.from(
    { length: Math.ceil(sortedModules.length / itemsPerPage) },
    (_, idx) => idx + 1
  );

  const MAX_PAGES_TO_SHOW = 5;
  const MAX_TITLE_STRING_LENGTH = 24;
  const MAX_STRING_LENGTH = 40;

  const canGoToPreviousSet = pagesListIndex > 0;
  const canGoToNextSet =
    pagesListIndex < Math.ceil(pages.length / MAX_PAGES_TO_SHOW) - 1;

  const currentTableData = useCallback(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setTableData(sortedModules.slice(startIndex, endIndex) as never);
  }, [itemsPerPage, page, sortedModules]);

  useEffect(() => {
    setSortedModules(modules);
  }, [modules]);

  useEffect(() => {
    currentTableData();
  }, [currentTableData]);

  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  const handleSort = (propRef: string, sortType: "asc" | "desc") => {
    const sortedData = sortItems([...modules], propRef, sortType);
    setSortedModules(sortedData);
    setPage(1);
  };

  return (
    <Card className="w-full lg:h-[640px] flex flex-col lg:justify-between mx-auto bg-white dark:bg-slate-900">
      <CardBody className="overflow-scroll p-0 rounded-lg w-full">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-slate-700">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head.label}
                  className="bg-gray-200 dark:bg-slate-700 px-2 py-2 lg:p-4"
                >
                  <Title
                    content={head.label}
                    className="text-[11px] md:text[12px] lg:text-sm text-gray-900 dark:text-gray-100"
                  />
                </th>
              ))}
            </tr>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head.label}
                  className="bg-white dark:bg-slate-900 py-1 px-4"
                >
                  {head.propRef && (
                    <div className="flex flex-row ml-[-8px]">
                      <SortButton
                        onClick={() => handleSort(head.propRef, "asc")}
                        sortType="asc"
                      />
                      <SortButton
                        onClick={() => handleSort(head.propRef, "desc")}
                        sortType="desc"
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-[90%] lg:w-full">
            {tableData.map(
              (
                { name, duration, course_name, description, total_classes },
                index
              ) => {
                const isLast = index === tableData.length - 1;
                const classes = isLast
                  ? "md:py-1 py-0"
                  : "md:py-1 py-0 border-b border-gray-200 dark:border-gray-800";
                return (
                  <tr
                    key={name}
                    className="even:bg-gray-50 dark:even:bg-slate-800"
                  >
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Subtitle
                          content={collapseLongString(
                            name,
                            MAX_TITLE_STRING_LENGTH
                          )}
                          className="block overflow-hidden text-ellipsis whitespace-nowrap text-[11px] md:text[12px] lg:text-sm ml-2 lg:ml-4 text-gray-700 dark:text-gray-300"
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Text
                        content={collapseLongString(
                          description,
                          MAX_STRING_LENGTH
                        )}
                        className="block overflow-hidden text-ellipsis whitespace-nowrap text-[11px] md:text[12px] lg:text-sm ml-2 lg:ml-4 text-gray-700 dark:text-gray-300"
                      />
                    </td>
                    <td className={classes}>
                      <Text
                        content={collapseLongString(
                          course_name,
                          MAX_TITLE_STRING_LENGTH
                        )}
                        className="block overflow-hidden text-ellipsis whitespace-nowrap text-[11px] md:text[12px] lg:text-sm ml-2 lg:ml-4 text-gray-700 dark:text-gray-300"
                      />
                    </td>
                    <td className={classes}>
                      <Text
                        content={duration}
                        className="block overflow-hidden text-ellipsis whitespace-nowrap text-[11px] md:text[12px] lg:text-sm ml-2 lg:ml-4 text-gray-700 dark:text-gray-300"
                      />
                    </td>
                    <td className={classes}>
                      <Text
                        content={total_classes.toString()}
                        className="block overflow-hidden text-ellipsis whitespace-nowrap text-[11px] md:text[12px] lg:text-sm ml-2 lg:ml-4 text-gray-700 dark:text-gray-300"
                      />
                    </td>
                    <td className={classes}>
                      <Tooltip
                        content="Editar dados do módulo"
                        className="hidden lg:flex"
                      >
                        <IconButton
                          variant="text"
                          onClick={onUpdateModule}
                          className="p-0 bg-transparent hover:bg-transparent hover:p-0 mr-8 lg:mr-4"
                        >
                          <MdEdit className="lg:h-5 lg:w-5 h-3 w-3 p-0 text-gray-700 dark:text-gray-300" />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Tooltip
                        content="Remover módulo"
                        className="hidden lg:flex"
                      >
                        <IconButton
                          variant="text"
                          className="p-0 bg-transparent hover:bg-transparent hover:p-0 lg:ml-[-40px] ml-[-46px]"
                          onClick={onDeleteModule}
                        >
                          <IoMdTrash className="lg:h-5 lg:w-5 h-3 w-3 text-red-500 lg:mr-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-blue-gray-50 p-4 w-full">
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="lg:w-[96px] text-[11px] lg:text-sm mx-auto normal-case text-gray-700 dark:text-gray-300 shadow-none dark:border-1 dark:border-gray-200"
        >
          Anterior
        </Button>
        <div className="flex md:flex-row flex-col md:w-full w-[90%] mx-auto items-center justify-center">
          <SelectInput
            label="Items por página"
            options={itemsPerPageOptions}
            className="mx-auto w-[96px]"
            containerClassName="md:mr-5 my-4 lg:my-0"
            labelClassName="text-[10px] lg:text-sm text-gray-700 dark:text-gray-100"
            isSearchable={false}
            onSelectOption={(val) => setItemsPerPage(val.value as never)}
          />
          <div className="flex items-center gap-2 mb-4 lg:mb-0">
            {pages.length > MAX_PAGES_TO_SHOW ? (
              <div className="flex flex-row">
                {canGoToPreviousSet && (
                  <IconButton
                    size="md"
                    onClick={() => setPagesListIndex(pagesListIndex - 1)}
                    variant="text"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <MdKeyboardDoubleArrowLeft className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  </IconButton>
                )}
                {pages
                  .slice(
                    pagesListIndex * MAX_PAGES_TO_SHOW,
                    MAX_PAGES_TO_SHOW * (pagesListIndex + 1)
                  )
                  .map((ModulePage) => (
                    <IconButton
                      key={ModulePage}
                      variant={page === ModulePage ? "outlined" : "text"}
                      size="sm"
                      onClick={() => setPage(ModulePage)}
                      className="text-[11px] lg:text-sm w-6 h-6 lg:w-8 lg:h-8 mr-2 mt-2 text-gray-700 dark:text-gray-300 shadow-none dark:border-1 dark:border-gray-200"
                    >
                      {ModulePage}
                    </IconButton>
                  ))}
                {canGoToNextSet && (
                  <IconButton
                    size="md"
                    onClick={() => setPagesListIndex(pagesListIndex + 1)}
                    variant="text"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <MdKeyboardDoubleArrowRight className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  </IconButton>
                )}
              </div>
            ) : (
              pages.map((ModulePage) => (
                <IconButton
                  key={ModulePage}
                  variant={page === ModulePage ? "outlined" : "text"}
                  size="sm"
                  onClick={() => setPage(ModulePage)}
                  className="text-[11px] lg:text-sm w-6 h-6 lg:w-8 lg:h-8 mr-2 mt-2 text-gray-700 dark:text-gray-300 shadow-none dark:border-1 dark:border-gray-200"
                >
                  {ModulePage}
                </IconButton>
              ))
            )}
          </div>
        </div>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page === pages[pages.length - 1]}
          className="lg:w-[96px] text-[11px] lg:text-sm mx-auto normal-case text-gray-700 dark:text-gray-300 shadow-none dark:border-1 dark:border-gray-200"
        >
          Próximo
        </Button>
      </CardFooter>
    </Card>
  );
}
