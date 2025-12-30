

import { loadCookie } from '../actions';
import JoinContent from './JoinContent';

export default async function Page() {
  const ticketId = await loadCookie(); 

  return (
    <JoinContent initialTicketId={ticketId} />
  );
}