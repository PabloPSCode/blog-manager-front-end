export interface IModule {
    name: string;
    description: string;
    duration: string;
    total_classes: number;
    course_name: string;
  }
  
  export interface ICreateModuleDTO {
    name: string;
    description: string;
    course_id: string;
  }
  
  export interface IUpdateModuleDTO {
    name?: string;
    description?: string;
  }
  