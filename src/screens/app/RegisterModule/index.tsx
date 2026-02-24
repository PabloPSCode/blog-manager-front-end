import {
  DESCRIPTION_MIN_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { SelectInput } from "@/components/inputs/SelectInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { coursesOptions } from "@/data/placeholders";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface RegisterModuleInputs {
  name: string;
  description: string;
  course: string;
}

export function RegisterModule() {
  const MIN_MODULE_DESCRIPTION_LENGTH = 24;
  const MAX_MODULE_DESCRIPTION_LENGTH = 200;

  const validationSchema = yup.object({
    name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    description: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(MIN_MODULE_DESCRIPTION_LENGTH, DESCRIPTION_MIN_MESSAGE),
    course: yup.string().required(REQUIRED_FIELD_MESSAGE),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<RegisterModuleInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const registerModule: SubmitHandler<RegisterModuleInputs> = (data) => {
    console.log(data);
  };

  const descriptionValue = watch("description");

  const handleCourseSelect = (selectedOption: { value: string }) => {
    setValue("course", selectedOption.value, { shouldValidate: true });
    trigger("course");
  };

  return (
    <main className="flex flex-1 flex-col bg-gray-100 dark:bg-slate-800 w-full">
      <div className="flex flex-col items-center w-[90%] lg:w-[560px] mx-auto">
        <div className="mb-4 w-full">
          <ScreenTitleIcon screenTitle="Cadastrar módulo" iconName="book" />
        </div>
        <form className="w-full" onSubmit={handleSubmit(registerModule)}>
          <div className="w-full mb-4">
            <TextInput
              inputLabel="Nome"
              placeholder="Nome do módulo"
              {...register("name")}
            />
            {errors.name && (
              <div>
                <ErrorMessage errorMessage={errors.name?.message} />
              </div>
            )}
          </div>
          <div className="w-full mb-4">
            <TextAreaInput
              label="Descrição"
              showTextLength
              currentTextLength={descriptionValue ? descriptionValue.length : 0}
              maxTextLength={MAX_MODULE_DESCRIPTION_LENGTH}
              placeholder="Descrição do módulo"
              {...register("description")}
            />
            {errors.description && (
              <div>
                <ErrorMessage errorMessage={errors.description?.message} />
              </div>
            )}
          </div>
          <div className="w-full mb-4">
            <SelectInput
              label="Selecione um curso"
              options={coursesOptions}
              placeholder="Selecione um curso"
              defaultValue="Selecione um curso"
              onSelectOption={handleCourseSelect as never}
            />
            {errors.course && (
              <div>
                <ErrorMessage errorMessage={errors.course?.message} />
              </div>
            )}
          </div>
          <div className="w-full mt-2">
            <Button
              title="Cadastrar Módulo"
              type="submit"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
