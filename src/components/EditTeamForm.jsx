import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/Cookie";

function EditTeamForm({ existingData, onCancel, onSave }) {
  const [fields, setFields] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const initialDifficultyMapping = { 쉬움: "1", 중간: "2", 어려움: "3" };
  const [difficulty, setDifficulty] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const navigate = useNavigate();

  const departmentMapping = {
    AI: 1,
    프론트: 2,
    백: 3,
    앱: 4,
    게임: 5,
  };

  useEffect(() => {
    console.log("existingData: ", existingData);
    if (existingData) {
      setTitle(existingData.title || "");
      setDescription(
        existingData.projectDescription || existingData.description || ""
      );
      // "난이도: " 제거 후 매핑
      const difficultyValue = existingData.difficulty.split(": ")[1];
      setDifficulty(initialDifficultyMapping[difficultyValue] || "");

      if (existingData.deadline) {
        const [yr, mn, dy] = existingData.deadline.split("-");
        setYear(yr);
        setMonth(String(parseInt(mn, 10))); // 앞자리 0 제거
        setDay(dy);
      }
      setFields(
        existingData.fields.map((field) => ({
          fieldId: field.fieldId,
          field:
            Object.keys(departmentMapping).find(
              (key) => departmentMapping[key] === field.department
            ) || "알 수 없음",
          members: field.range,
        }))
      );
    }
    console.log("EditTeamForm - existingData:", existingData);
  }, [existingData]);

  // 핸들러: 필드를 변경할 때 사용하는 함수
  const handleFieldChange = (index, value, type) => {
    setFields((prevFields) =>
      prevFields.map((field, i) => {
        if (i === index) {
          if (type === "department") {
            return { ...field, field: value };
          } else if (type === "members") {
            return { ...field, members: parseInt(value, 10) };
          }
        }
        return field;
      })
    );
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!title || !description || !difficulty || !year || !month || !day) {
      alert("모든 필드를 입력하세요!");
      return;
    }
    if (fields.length === 0) {
      alert("최소 하나의 분야가 필요합니다!");
      return;
    }

    // 데이터 변환
    const projectData = {
      title,
      description,
      difficult: parseInt(difficulty, 10), // 난이도를 숫자로 변환
      deadline: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`, // 날짜 형식
      fields: fields.map((field) => ({
        fieldId: field.fieldId, // 여기서 필드 ID도 함께 보내줍니다
        department: departmentMapping[field.field], // 부서 숫자
        range: field.members, // 인원 수
      })),
    };

    try {
      const token = getCookie("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/projects/${existingData.id}`,
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSave(response.data); // 수정된 데이터 부모 컴포넌트로 전달
      alert("데이터가 성공적으로 수정되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("수정 중 에러 발생:", error);
      alert("데이터가 성공적으로 수정되었습니다!");
      navigate("/");
    }
  };

  return (
    <Container>
      <Header>팀 수정하기</Header>

      <DetailLayout>
        <DetailTitle>게시물 제목</DetailTitle>
        <StyledInput
          type="text"
          placeholder="게시물 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DetailLayout>

      <DetailLayout>
        <Layout1>
          <HalfSection>
            <DetailTitle>난이도</DetailTitle>
            <SelectWrapper>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="" disabled>
                  난이도
                </option>
                <option value="1">쉬움</option>
                <option value="2">중간</option>
                <option value="3">어려움</option>
              </Select>
              <Icon>
                <IoIosArrowDown size={24} />
              </Icon>
            </SelectWrapper>
          </HalfSection>
          <HalfSection>
            <DetailTitle>기간</DetailTitle>
            <DatePickerWrapper>
              <ScrollSelectWrapper>
                <ScrollSelect
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="" disabled>
                    년도
                  </option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={2023 + i}>
                      {2023 + i}
                    </option>
                  ))}
                </ScrollSelect>
                <Icon>
                  <IoIosArrowDown size={24} />
                </Icon>
              </ScrollSelectWrapper>

              <ScrollSelectWrapper>
                <ScrollSelect
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="" disabled>
                    월
                  </option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </ScrollSelect>
                <Icon>
                  <IoIosArrowDown size={24} />
                </Icon>
              </ScrollSelectWrapper>

              <ScrollSelectWrapper>
                <ScrollSelect
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="" disabled>
                    일
                  </option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </ScrollSelect>
                <Icon>
                  <IoIosArrowDown size={24} />
                </Icon>
              </ScrollSelectWrapper>
            </DatePickerWrapper>
          </HalfSection>
        </Layout1>
      </DetailLayout>

      {/* 분야 및 인원 (수정만 가능, 추가/삭제 불가능) */}
      <DetailLayout>
        <DetailTitle>분야 및 인원</DetailTitle>
        {fields.map((item, index) => (
          <FieldRow key={index}>
            <SelectWrapper>
              <Select
                value={item.field}
                onChange={(e) =>
                  handleFieldChange(index, e.target.value, "department")
                }
              >
                <option value="AI">AI</option>
                <option value="프론트">프론트</option>
                <option value="백">백</option>
                <option value="앱">앱</option>
                <option value="게임">게임</option>
              </Select>
              <Icon>
                <IoIosArrowDown size={24} />
              </Icon>
            </SelectWrapper>

            <SelectWrapper>
              <Select
                value={item.members}
                onChange={(e) =>
                  handleFieldChange(index, e.target.value, "members")
                }
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}명
                  </option>
                ))}
              </Select>
              <Icon>
                <IoIosArrowDown size={24} />
              </Icon>
            </SelectWrapper>
          </FieldRow>
        ))}
      </DetailLayout>

      <DetailLayout>
        <DetailTitle>프로젝트 설명</DetailTitle>
        <StyledTextArea
          placeholder="프로젝트 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DetailLayout>

      <ButtonLayout>
        <Button onClick={handleSubmit}>수정</Button>
        <Button1 onClick={onCancel}>닫기</Button1>
      </ButtonLayout>
    </Container>
  );
}

export default EditTeamForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  padding: 24px;
  margin: auto;
  max-width: 1440px;
  width: 100%;
`;

const Header = styled.h1`
  font-size: 36px;
  font-family: "yg-jalnan", sans-serif;
  color: #1c1c1d;
  margin-bottom: 20px;
`;

const Layout1 = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

const HalfSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DetailTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0;
`;

const DetailLayout = styled.div`
  display: flex;
  margin-bottom: 48px;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 64px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  font-size: 18px;
  color: #1c1c1d;
  outline: none;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 64px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  font-size: 18px;
  color: #1c1c1d;
  outline: none;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  padding: 8px 16px;
  padding-right: 40px;
  background: #ffffff;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  font-size: 18px;
  color: #1c1c1d;
  outline: none;
  appearance: none;

  &:focus {
    border-color: #015fcc;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #1c1c1d;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ScrollSelectWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
`;

const ScrollSelect = styled.select`
  width: 100%;
  height: 100%;
  padding: 8px 12px;
  padding-right: 40px;
  background: #ffffff;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  font-size: 16px;
  color: #1c1c1d;
  outline: none;
  appearance: none;

  &:focus {
    border-color: #015fcc;
  }
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const Button = styled.button`
  width: 122px;
  height: 56px;
  background-color: #dcdaf5;
  color: #21005d;
  font-size: 20px;
  border-radius: 24px;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #21005d;
    color: #dcdaf5;
  }
`;

const Button1 = styled.button`
  width: 122px;
  height: 56px;
  background-color: #f2ecee;
  color: #787579;
  font-size: 20px;
  border-radius: 24px;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #787579;
    color: #f2ecee;
  }
`;
