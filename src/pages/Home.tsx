import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // useNavigate 선언
  const navigate = useNavigate();

  return (
    <Wrap>
      <div className="title">
        <span>사내 메신저</span>
        <button>방만들기</button>
      </div>
      <hr />
      <div className="room-list">
        <ul>
          <li
            onClick={() => {
              navigate("/room/1");
            }}
          >
            사업부 회식하는데 같이 가실분?
          </li>
          <li
            onClick={() => {
              navigate("/room/2");
            }}
          >
            오늘 점심 구내식당 말고 다른 곳 가요.
          </li>
          <li
            onClick={() => {
              navigate("/room/3");
            }}
          >
            퇴근 후에 한잔 하실분 있나요?
          </li>
        </ul>
      </div>
    </Wrap>
  );
};

export default Home;
const Wrap = styled.main`
  // inline 태그는 width, height 무시
  // margin, padding 속성은 좌우 간격만 반영, 상하 간격은 반영 x.
  span {
    font-weight: 700;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  hr {
    margin: 2rem 0;
  }
  .room-list {
    ul {
      list-style: none;
      li {
        padding: 1rem;
        &:hover {
          cursor: pointer;
          background-color: rgba(0, 123, 255, 0.1);
          color: #35a3dc;
        }
      }
    }
  }
`;
