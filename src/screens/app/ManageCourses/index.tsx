import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { courses } from "@/data/mocked";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import { CoursesTable } from "./components/CoursesTable";
import { EditCourseModal } from "./components/EditCourseModal";

export function ManageCourses() {
  const [isDeleteModalOpen, setIsDeleteModalUserOpen] = useState(false);
  const [isEditCourseModalOpen, setIsEditModalUserOpen] = useState(false);

  const handleToggleEditCourseModal = () => {
    setIsEditModalUserOpen(!isEditCourseModalOpen);
  };
  const handleToggleDeleteModal = () => {
    setIsDeleteModalUserOpen(!isDeleteModalOpen);
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col  w-full mx-auto xl:pr-8">
        <div className="mb-2 flex flex-row w-[full] justify-between items-center">
          <div className="mr-3 ml-4">
            <ScreenTitleIcon screenTitle="Cursos" iconName="book-open" />
          </div>
          <div className="mr-4">
            <Link to="/dashboard/cadastrar-curso">
              <PlusButton title="Cadastrar novo curso" />
            </Link>
          </div>
        </div>
        <div className="lg:w-full flex-col flex md:items-center px-4">
          <CoursesTable
            courses={courses}
            onDeleteCourse={handleToggleDeleteModal}
            onUpdateCourse={handleToggleEditCourseModal}
          />
        </div>
      </div>
      <DeleteModal
        resource="curso"
        isOpen={isDeleteModalOpen}
        onClose={handleToggleDeleteModal}
        onRequestClose={handleToggleDeleteModal}
        onConfirmAction={() => console.log("Course deleted")}
      />
      <EditCourseModal
        isOpen={isEditCourseModalOpen}
        onClose={handleToggleEditCourseModal}
        onRequestClose={handleToggleEditCourseModal}
        onConfirmAction={() => console.log("Course edited")}
      />
    </main>
  );
}
