export interface Trip {
  _id?: string;
  userId: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
  activities: Array<string>;
  itinerary?: Array<{
    label: string;
    items: Array<{
      time?: string;
      title: string;
      notes?: string;
    }>;
  }>;
}


