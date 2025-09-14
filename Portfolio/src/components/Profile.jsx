import React, { useEffect, useMemo, useState}from "react";
import styled from "styled-components";
import { Octokit } from "octokit";
import Piplup from "../assets/piplup.JPG";

const Section = styled.section`
  scroll-margin-top: 80px;
  padding: 72px 20px;
  background: #ffffff;
  color: #111111;
`;

const Wrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 28px;
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 24px;
  object-fit: cover;
  border: 1px solid #eeeeee;
  box-shadow: 0 6px 18px rgba(0,0,0,.06);
  justify-self: center;
`;

const Heading = styled.h2`
  margin: 0 0 8px;
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 900;
`;

const Lead = styled.p`
  margin: 0 0 18px;
  color: #555555;
  line-height: 1.6;
`;

const Grid = styled.dl`
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: start;
  row-gap: 10px;
  column-gap: 12px;
  margin: 0 0 18px;
`;

const DT = styled.dt`
  font-weight: 700;
  color: #333333;
`;

const DD = styled.dd`
  margin: 0;
  color: #444444;
  word-break: break-word;

  a { color: #7ebdf4; text-decoration: none; }
  a:hover { text-decoration: underline; }
`;

const GHStats = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Stat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #eeeeee;
  background: #fafafa;
  color: #333333;
  padding: 8px 10px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 12px;
`;

const DEFAULT_PROFILE = {
  name: "최진원",
  about: "가시성이 좋은 UI/UX를 지향하는 프론트엔드 개발자를 목표로 하고 있습니다",
  photo: Piplup, // 오류 발생시 있을 기본 사진
  birth: "2002-02-16",
  location: "서울 금천구",
  phone: "+82-10-2996-4958",
  email: "lida4958@naver.com",
  major: "소프트웨어공학과, 디지털콘텐츠학과",
  github: "https://github.com/JJING-WONG"
};

export default function Profile({ data = DEFAULT_PROFILE }) {
  const { name, about, photo, birth, location, phone, email, major, github } = data;

  const githubUsername = useMemo(() => {
    try {
      if (!github)
        return null;
      const u = new URL(github);
      const parts = u.pathname.split("/").filter(Boolean);
      return parts[0] || null;
    } catch {
      return null;
    }
  }, [github]);

  const [gh, setGh] = useState(null);
  const [loading, setLoading] = useState(false); // 여기 있는 값들은 어쩌다보니 안 쓰게 됐는데 이런 식으로 놔두면 안 좋은 코드일까?
  const [err, setErr] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!githubUsername) return;
      setLoading(true);
      setErr(null);
      try {
        const octokit = new Octokit();
        const { data } = await octokit.request("GET /users/{username}", {
          username: githubUsername, // 이미 위에 내 깃허브 url가 있길래 이렇게 해봤어
        });
        if (!ignore) setGh(data);
      } catch (e) {
        if (!ignore) setErr(e?.message || "GitHub 정보를 가져오지 못했습니다.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [githubUsername]);

  const avatarSrc = gh?.avatar_url || photo; // 깃허브 못 불러오면 기본으로 설정한 이미지로

  return (
    <Section id="profile" aria-label="About Me">
      <Wrap>
        <Avatar src={avatarSrc} alt={`${name} 프로필 사진`} />

        <div>
          <Heading>ABOUT ME</Heading>
          <Lead>{name} — {about}</Lead>

          <Grid>
            <DT>생년월일</DT>
            <DD><time dateTime={birth}>{birth}</time></DD>

            <DT>위치</DT>
            <DD>{location}</DD>

            <DT>연락처</DT>
            <DD><a href={`tel:${phone.replaceAll(/[^0-9+]/g, "")}`}>{phone}</a></DD>

            <DT>이메일</DT>
            <DD><a href={`mailto:${email}`}>{email}</a></DD>

            <DT>전공</DT>
            <DD>{major}</DD>

            <DT>GitHub</DT>
            <DD><a href={github} target="_blank" rel="noreferrer">{github}</a></DD>
          </Grid>
        </div>
      </Wrap>
    </Section>
  );
}