import SeatAvailable from "../assets/seat-available.svg";
import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName } from "../helpers";
import { range } from "../utils";
import Seat from "./Seat";
import { SeatContext } from "./SeatContext";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded },
  } = useContext(SeatContext);

  if (hasLoaded) {
    return (
      <Wrapper>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);
          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                return (
                  <SeatWrapper key={seatIndex}>
                    <Seat rowName={rowName} seatIndex={seatIndex} />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <ProgressWrapper>
        <CircularProgress />
      </ProgressWrapper>
    );
  }
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  padding: 8px;
  background: #eee;
`;

const ProgressWrapper = styled(Wrapper)`
  background: transparent;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  left: -80px;
  position: absolute;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
