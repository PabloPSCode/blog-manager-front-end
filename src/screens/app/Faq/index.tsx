import Accordeon from "@/components/miscellaneous/Acordeon";
import { faqQuestions } from "@/data/mocked";

export function Faq() {
  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col w-full mx-auto xl:pr-8">
        <div className="my-4 ml-4">
          <h1 className="text-black dark:text-white text-2xl font-bold font-secondary">
            Perguntas frequentes
          </h1>
        </div>

        <div className="px-4 mb-6">
          <Accordeon
            questions={faqQuestions}
            allowMultiple
            defaultOpen={[0]}
            maxWidthClassName="max-w-none"
          />
        </div>
      </div>
    </main>
  );
}
