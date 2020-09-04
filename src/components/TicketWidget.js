import SeatAvailable from "../assets/seat-available.svg";
import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

import { SeatContext } from "./SeatContext";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
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
                const seatNum = getSeatNum(seatIndex);
                const seatID = `${rowName}-${seatNum}`;
                const isAvailable = seats[seatID];
                const toolTipContent = isAvailable
                  ? `Row ${rowName}, Seat ${seatNum} - ${isAvailable.price}`
                  : "Unavailable";
                return (
                  <SeatWrapper key={seatID}>
                    <Tippy content={toolTipContent}>
                      <Seat
                        src={SeatAvailable}
                        isAvailable={isAvailable}
                        rowIndex={rowIndex}
                        seatIndex={seatIndex}
                        width={36}
                        height={36}
                        price={isAvailable.price}
                        status={
                          isAvailable.isBooked ? "unavailable" : "available"
                        }
                        style={{
                          filter: isAvailable.isBooked
                            ? "grayscale(100%)"
                            : "sepia(100%)",
                        }}
                      />
                    </Tippy>
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

const SeatWrapper = styled.button`
  padding: 5px;
`;

const Seat = styled.img`
  cursor: pointer;
  filter: ${(props) => (!props.isAvailable ? "grayscale(100%)" : "")};
`;

export default TicketWidget;
