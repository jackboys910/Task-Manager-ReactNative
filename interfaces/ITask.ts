import { IAttachment } from './IAttachment';

export interface ITask {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  attachments?: IAttachment[];
}
