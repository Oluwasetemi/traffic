export interface DriverLicenseValidationRequest {
  driversLicNo: string
  controlNo: string
  origLicIssueDate: string // YYYY-MM-DD
  dateOfBirth: string // YYYY-MM-DD
  ipAddress?: string
}

export interface ExternalTicket {
  ticketNo?: string
  id?: string
  offenceDesc?: string
  violation?: string
  issueDate?: string
  violationDate?: string
  courtLocation?: string
  location?: string
  fineAmount?: string | number
  workflowState?: string
  paymentDueDate?: string
  dueDate?: string
  offenderFirstName?: string
  offenderLastName?: string
  demeritPoints?: string | number
  mandatoryCourtApp?: string | boolean
  offenceCode?: string
  courtDate?: string
}

export interface TrafficTicket {
  id: string
  ticketNumber: string
  violation: string
  violationDate: string
  location: string
  fineAmount: number
  status: 'Outstanding' | 'Paid'
  dueDate: string
  officerName: string
  officerBadge: string
  offenderName?: string
  demeritPoints?: number
  mandatoryCourtApp?: boolean
  offenceCode?: string
  paidDate?: string
  paymentMethod?: string
  [index: string]: unknown | string | number
}

export interface TicketSearchRequest {
  driversLicNo: string
  controlNo: string
  dateOfBirth: string
  origLicIssueDate?: string
}

export interface TicketSearchResponse {
  tickets: TrafficTicket[]
  totalTickets: number
  outstanding: number
  totalOutstanding: number
}

export interface ApiError {
  type: string
  title: string
  status: number
  detail: string
  path: string
  message: string
}
