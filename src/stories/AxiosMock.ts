import { useEffect } from 'react';
import MockAdapter from 'axios-mock-adapter';
import { getAxios } from '../../utils/get-axios';

interface IProps {
  children: any;
  mock: (adapter: MockAdapter) => void;
}

let apiMock = new MockAdapter(getAxios()); //getAxios(), {delayResponse: delay});
const AxiosMock = ({ children, mock }: IProps) => {
  useEffect(() => {
    mock(apiMock);
    return () => {
      apiMock.reset();
    };
  });
  return children;
};

export default AxiosMock;
