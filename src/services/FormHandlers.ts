export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  profilePhoto?: string;
  name?: string;
  status?: 'Active' | 'Inactive';
  documents?: string[];
}

export interface Timesheet {
  id?: number;
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
  breakDuration: number;
  notes?: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
}

export interface MarketingCandidate {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  source: string;
  status: string;
}

export class FormHandlers {
  private static getStorageKey(type: string): string {
    return `${type}_data`;
  }

  private static getData<T>(type: string): T[] {
    const data = localStorage.getItem(this.getStorageKey(type));
    return data ? JSON.parse(data) : [];
  }

  private static saveData<T>(type: string, data: T[]): void {
    localStorage.setItem(this.getStorageKey(type), JSON.stringify(data));
  }

  static addEmployee(employee: Employee): Promise<Employee> {
    return new Promise((resolve) => {
      const employees = this.getData<Employee>('employees');
      const newEmployee = {
        ...employee,
        id: Date.now(),
        name: `${employee.firstName} ${employee.lastName}`,
        status: 'Active' as const,
        documents: [] as string[]
      };
      
      employees.push(newEmployee);
      this.saveData('employees', employees);
      
      // Simulate API delay
      setTimeout(() => resolve(newEmployee), 500);
    });
  }

  static addTimesheet(timesheet: Timesheet): Promise<Timesheet> {
    return new Promise((resolve) => {
      const timesheets = this.getData<Timesheet>('timesheets');
      const newTimesheet = {
        ...timesheet,
        id: Date.now(),
        totalHours: this.calculateTotalHours(timesheet.startTime, timesheet.endTime, timesheet.breakDuration)
      };
      
      timesheets.push(newTimesheet);
      this.saveData('timesheets', timesheets);
      
      setTimeout(() => resolve(newTimesheet), 500);
    });
  }

  static addMarketingCandidate(candidate: MarketingCandidate): Promise<MarketingCandidate> {
    return new Promise((resolve) => {
      const candidates = this.getData<MarketingCandidate>('marketing_candidates');
      const newCandidate = {
        ...candidate,
        id: Date.now(),
        submissions: 0,
        interviews: 0,
        lastContact: new Date().toISOString().split('T')[0]
      };
      
      candidates.push(newCandidate);
      this.saveData('marketing_candidates', candidates);
      
      setTimeout(() => resolve(newCandidate), 500);
    });
  }

  static getEmployees(): Promise<Employee[]> {
    return new Promise((resolve) => {
      const employees = this.getData<Employee>('employees');
      setTimeout(() => resolve(employees), 200);
    });
  }

  static getTimesheets(): Promise<Timesheet[]> {
    return new Promise((resolve) => {
      const timesheets = this.getData<Timesheet>('timesheets');
      setTimeout(() => resolve(timesheets), 200);
    });
  }

  static getMarketingCandidates(): Promise<MarketingCandidate[]> {
    return new Promise((resolve) => {
      const candidates = this.getData<MarketingCandidate>('marketing_candidates');
      setTimeout(() => resolve(candidates), 200);
    });
  }

  private static calculateTotalHours(startTime: string, endTime: string, breakDuration: number): number {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    const totalMinutes = endMinutes - startMinutes - breakDuration;
    return Math.max(0, totalMinutes / 60);
  }

  static sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate email sending
      console.log(`Sending email to ${to}: ${subject}`);
      console.log(`Body: ${body}`);
      
      setTimeout(() => resolve(true), 1000);
    });
  }
}
