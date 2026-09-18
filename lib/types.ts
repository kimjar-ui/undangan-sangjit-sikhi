export type Wish = {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir" | "ragu";
  originalMessage: string;
  formattedMessage: string;
  createdAt: string;
};

export type RSVPPayload = {
  name: string;
  attendance: "hadir" | "tidak_hadir" | "ragu";
  guestCount: number;
  message: string;
};
