

import { loadCookie } from '../actions';
import JoinContent from './JoinContent';

export default async function Page() {

  const rawData = await loadCookie();  
  let ticketId = null;

  if (rawData) {
    try {
      const parsedData = JSON.parse(rawData);
      ticketId = parsedData.ticketId;
    } catch (e) {
      ticketId = rawData;
    }
  }
  return (
    <JoinContent initialTicketId={ticketId} />
  );
}