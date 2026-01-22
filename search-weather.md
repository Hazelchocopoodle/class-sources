
## 1. 주제
 - 원하는 지역의 현재 날씨를 검색하는 웹페이지 제작

## 2. 기능제약
 - 바닐라스크립트만 사용

## 3. 파일구조
 - html 은 weather.html으로 생성
 - css와 js는 각각 파일로 나눠서 작성
 - 파일명은 html과 동일하게 작성

## 4. 폴더구조
 Todo-list/
   |- weather.html
   |—css/
   | |—weather.css
   |—js/
     |—weather.js

## 5. 상세기능
 - 지역을 입력하는 input
 - 검색버트 필요
 - 검색된 지역을 보여주는 UI 
 - 검색된 지역의 날씨 표현 (지역, 온도, 구름상태)
 - 날씨는 아이콘으로 표시

## 6. 기능요구사항
 - API 연동: https://openweathermap.org 이용
  - **호출 API**: https://api.openweathermap.org/data/2.5/weather?q={도시}&lon=-2.15&appid={API KEY}&units=metric
- 도시는 입력된 내용으로 치환
- api는 차후 등록

### 6.2 UI 구성
 - 화면 상단 가운데 제목 표시
 - 검색결과는 화면 중앙에 정렬
 - 디자인은 29cm 웹사이트 느낌으로 해줘