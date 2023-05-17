import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation sendMessage($value: String!, $toId: String!) {
    sendMessage(data: { value: $value, toId: $toId }) {
      id
      roomId
      value
      type
      senderId
    }
  }
`;
