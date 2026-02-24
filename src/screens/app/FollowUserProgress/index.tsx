import { SelectInput } from "@/components/inputs/SelectInput";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { Subtitle } from "@/components/typography/Subtitle";
import { userMetrics } from "@/data/mocked";
import { useState } from "react";
import { CourseProgressCard } from "./components/CourseProgressCard";

export function FollowUserProgress() {
  const [selectedUser, setSelectedUser] = useState("");

  const usersOptions = userMetrics.map((metric) => ({
    value: metric.user.name,
    label: metric.user.name,
  }));

  const selectedUserMetrics = userMetrics.filter(
    (metric) => metric.user.name === selectedUser
  );

  const MAX_COURSES_HIDDEN_SCROLL = 5;

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full lg:p-4 mx-auto">
      <div className="flex flex-col items-center w-full md:w-[75vw] xl:w-[45vw] mx-auto">
        <div className="mb-4 w-full">
          <ScreenTitleIcon
            screenTitle="Acompanhar progresso do usuário"
            iconName="activity"
          />
        </div>
        <div className="w-full flex flex-row mb-4 items-center">
          <SelectInput
            label="Selecione um usuário para visualizar o progresso"
            options={usersOptions}
            onSelectOption={(val) => setSelectedUser(val.label)}
            placeholder="Selecione um usuário"
            defaultValue="Selecione um usuário"
          />
        </div>
        <div className="mb-4 w-full">
          {selectedUser && (
            <Subtitle content={`Listando progresso de ${selectedUser}`} />
          )}
        </div>
        <div
          className={
            selectedUserMetrics.map((course) =>
              course.user.courses.length > MAX_COURSES_HIDDEN_SCROLL
                ? "w-full flex flex-col max-h-[480px] overflow-y-scroll"
                : "w-full flex flex-col max-h-[480px]"
            ) as never
          }
        >
          {selectedUserMetrics.map((metric) =>
            metric.user.courses.map((course) => (
              <CourseProgressCard
                totalCourseClasses={course.totalCourseClasses}
                totalWatchedClasses={course.totalWatchedClasses}
                key={course.name}
                course={course.name}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
