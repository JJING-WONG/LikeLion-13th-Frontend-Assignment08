import React, { useMemo, useState } from "react";
import styled from "styled-components";
import First from "../assets/projects/first.png";
import Second from "../assets/projects/second.png";
import Third from "../assets/projects/third.png";

const Section = styled.section`
  scroll-margin-top: 80px;
  padding: 72px 20px;
  background: #ffffff;
  color: #111111;
`;

const Wrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const H2 = styled.h2`
  margin: 0 0 16px;
  font-size: clamp(24px,4vw,32px);
  font-weight: 900;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const FilterBtn = styled.button`
  border: 1px solid ${p=>p["data-active"] ? "#7ebdf4" : "#e5e7eb"};
  color: ${p=>p["data-active"] ? "#7ebdf4" : "#333333"};
  background: #ffffff; border-radius: 999px; padding: 8px 12px;
  font-weight: 700;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px,1fr));
  gap: 16px;
`;

const Card = styled.button`
  text-align: left;
  border: 1px solid #eeeeee;
  border-radius: 16px;
  background: #fafafa;
  overflow: hidden; cursor: pointer;
  transition: transform .15s ease, border-color .15s ease;
  &:hover { transform: translateY(-2px); border-color: #7ebdf4; }
`;

const Thumb = styled.div`
  aspect-ratio: 16/9;
  background: #dddddd url(${p=>p.src}) center/cover no-repeat;
`;

const Body = styled.div`
  padding: 14px;
  display: grid;
  gap: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
`;

const Summary = styled.p`
  margin: 0;
  color: #555555;
  line-height: 1.5;
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Badge = styled.span`
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-weight: 700;
  color:#333333;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.36);
  z-index: 50;
  display: ${p=>p.open ? "grid" : "none"};
  place-items: center;
  padding: 20px;
`;

const Modal = styled.div`
  max-width: 880px;
  width: 100%;
  background: #ffffff;
  color: #111111;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #eeeeee;
  display: grid;
  grid-template-columns: 1fr; 
`;

const ModalHead = styled.div`
  padding: 16px 18px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  font-weight: 900;
`;

const CloseBtn = styled.button`
  border: 1px solid #e5e7eb;
  background: #ffffff;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 700;
`;

const ModalBody = styled.div`
  display: grid;
  gap: 14px;
  padding: 16px 18px;
`;

const Row = styled.div`
  display: grid;
  gap: 8px;
`;

const Label = styled.div`
  font-weight: 800;
  color: #222222;
`;

const Para = styled.p`
  margin: 0;
  color: #444444;
  line-height: 1.6;
`;

const PROJECTS = [
  {
    id: "p1",
    title: "축제/공연/전시 추천 서비스",
    cover: First,
    role: "Leader, Planning, Design, Front-end",
    stack: ["React", "Vite", "React Query", "styled-components", "Vercel", "Figma"],
    summary: "AI를 사용해 사용자 위치·날짜·카테고리 기반으로 축제를 탐색하고, 챗봇/축제 등록 플로우 제공",
    problem: "지역 행사 정보가 분산되어 탐색 비용이 높고, 소규모 주최자는 홍보 채널이 부족",
    solution: "필터·검색·찜/리뷰, 주최자 등록 흐름, 간단한 챗봇 FAQ로 탐색과 등록 비용을 낮춤",
    tags: ["Frontend", "Planning", "Design"],
  },
  {
    id: "p2",
    title: "Pokédex Searcher",
    cover: Second,
    role: "Frontend, Design",
    stack: ["React", "React Query", "styled-components", "PokeAPI"],
    summary: "151종 포켓몬 검색/필터/상세 보기. 로딩 스피너와 캐싱으로 체감 속도 개선",
    problem: "포켓몬 도감 탐색 시 잦은 API 호출로 로딩 체감이 큼",
    solution: "React Query 캐시/프리페치, 스피너/빈상태/에러 UI 설계",
    tags: ["Frontend", "Design"],
  },
  {
    id: "p3",
    title: "나들이/데이트 코스를 간편하게 구성해주는 AI 추천 서비스",
    cover: Third,
    role: "Leader, Planning",
    stack: ["Fimga"],
    summary: "위치와 무드를 기반으로 한 맞춤형 AI 추천 서비스",
    problem: "인터넷과 SNS로 놀러갈 곳을 찾기가 버거움",
    solution: "그날의 기분, 날짜, 위치 등을 선택하면 AI가 맞춤형으로 코스를 설계",
    tags: ["Planning"],
  },
];

const FILTERS = ["All", "Frontend", "Design", "Planning"];

export default function Project() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const list = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter(p => p.tags?.includes(filter));
  }, [filter]);

  const current = list.find(p => p.id === open);

  return (
    <Section id="project" aria-label="Projects">
      <Wrap>
        <H2>PROJECTS</H2>

        <FilterBar>
          {FILTERS.map(f => (
            <FilterBtn key={f} data-active={f===filter} onClick={()=>setFilter(f)}>
              {f}
            </FilterBtn>
          ))}
        </FilterBar>

        <Grid>
          {list.map(p => (
            <Card key={p.id} onClick={()=>setOpen(p.id)} aria-label={`${p.title} 상세 보기`}>
              <Thumb src={p.cover} />
              <Body>
                <Title>{p.title}</Title>
                <Summary>{p.summary}</Summary>
                <Badges>{p.stack.slice(0,5).map(s => <Badge key={s}>{s}</Badge>)}</Badges>
              </Body>
            </Card>
          ))}
        </Grid>

        <Backdrop open={Boolean(current)} onClick={()=>setOpen(null)}>
          <Modal onClick={(e)=>e.stopPropagation()}>
            <ModalHead>
              <ModalTitle>{current?.title}</ModalTitle>
              <CloseBtn onClick={()=>setOpen(null)}>닫기</CloseBtn>
            </ModalHead>
            <ModalBody>
              <Row>
                <Label>한줄 요약</Label>
                <Para>{current?.summary}</Para>
              </Row>
              <Row>
                <Label>역할</Label>
                <Para>{current?.role}</Para>
              </Row>
              <Row>
                <Label>문제</Label>
                <Para>{current?.problem}</Para>
              </Row>
              <Row>
                <Label>해결</Label>
                <Para>{current?.solution}</Para>
              </Row>
              <Row>
                <Label>기술 스택</Label>
                <Badges>{current?.stack.map(s => <Badge key={s}>{s}</Badge>)}</Badges>
              </Row>      
            </ModalBody>
          </Modal>
        </Backdrop>
      </Wrap>
    </Section>
  );
}