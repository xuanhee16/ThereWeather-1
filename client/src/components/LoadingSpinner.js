import styled from "styled-components";

const Spinner = styled.img`
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  animation: add-spin linear infinite reverse;
  animation-duration: ${props => props.duration || '2s'};
`;

export default function LoadingSpinner({ size, duration }) {
  return (
    <Spinner src="img/spinner.png" size={size} duration={duration} />
  );
}
