export type QuickAction = {
  title: string;
  description: string;
  href: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  price: string;
  category: string;
  description: string;
  cta: string;
};

export type ProductItem = {
  id: string;
  name: string;
  price: string;
  tag: string;
  description: string;
};

export type OfferItem = {
  id: string;
  title: string;
  description: string;
  expires: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  times: string[];
};

export type ApiProductItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description: string;
  available?: boolean;
  createdAt?: string;
};

export type BookingStatus = "pending" | "confirmed" | "rejected";

export type BookingRequestInput = {
  serviceId: string;
  partySize: string;
  preferredTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
};

export type BookingRecord = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  partySize: number;
  preferredTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export type EventsApiResponse =
  | {
      success: true;
      data: EventItem[];
      empty: boolean;
    }
  | {
      success: false;
      data: EventItem[];
      empty: boolean;
      error: string;
    };

export type BookingRequestFieldErrors = FieldErrors<keyof BookingRequestInput>;

export type BookingRequestApiResponse =
  | {
      success: true;
      message: string;
      data: {
        id: string;
        status: BookingStatus;
        createdAt: string;
      };
    }
  | {
      success: false;
      error: string;
      fieldErrors?: BookingRequestFieldErrors;
    };

export type BookingStatusApiResponse =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      error: string;
    };

export type ApiErrorResponse = {
  success: false;
  error: string;
};

export type ProductsApiResponse =
  | {
      success: true;
      data: ApiProductItem[];
      empty: boolean;
    }
  | ApiErrorResponse;

export type BookingsApiResponse =
  | {
      success: true;
      data: BookingRecord[];
      empty: boolean;
    }
  | ApiErrorResponse;
