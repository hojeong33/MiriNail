const ArCard = () => {
  return (
    <div
      style={{
        width: "60%",
        backgroundColor: "white",
        padding: "6rem 8rem",
        marginRight: "auto",
        marginLeft: "auto",
        position: "relative",
        top: "200px",
        marginBottom: "500px",
      }}
    >
      <div style={{ fontSize: "3rem", fontWeight: "500" }}>
        미리네일 Virtual Nail Try On
      </div>
      <div>미리네일과 함께 가상 피팅 서비스를 경험해보세요.</div>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "500",
          margin: "3rem",
          textAlign: "center",
        }}
      >
        네일 메이크업 경험하는 방법의 혁신
      </div>
      <div style={{ fontSize: "1rem", margin: "1rem 0" }}>
        {" "}
        새로운 네일 메이크업이나 최신 유행 컬러를 시도하고 싶었지만 부담되거나
        결과물이 어울리지 않을까봐 걱정되어 메이크업을 포기한 경험이 있습니까?
        새로운 모습으로 변하는 것은 많은 비용을 발생시키길 수 있습니다. 또한
        새로운 디자인을 경험하기에 시간, 공간적인 부족함이 있을 수도 있습니다.
      </div>
      <div style={{ margin: "1rem 0" }}>
        {" "}
        시간, 공간적인 어려움을 해소하기 위해 만들어진 것이 바로 미리네일 AR
        피팅 서비스 입니다. 일체의 비용 없이 내가 원하는 네일을 경험할 수
        있습니다.
      </div>
      <div style={{ margin: "1rem 0" }}>
        {" "}
        우리는 증강 현실서비스를 통하여 사용잦들에게 새로운 경험을 선물합니다.
        각지의 디자이너들이 올리는 네일 디자인들을 AR서비스를 통해 경험해보세요.
        따로 샵에 가지 않고 집에서 편안하게 네일 디자인을 선택하고, 미리 경험할
        수 있어 선택이 훨씬 쉬워집니다.
      </div>
      <div style={{ margin: "1rem 0" }}>
        가상 네일 피팅을 위한 세 가지 팁이 있습니다.
      </div>
      <div style={{ fontWeight: "bold" }}>
        STEP 1: 제공되는 가이드 이미지와 같은 손동작을 펼쳐주세요.
      </div>
      <div style={{ marginBottom: "1rem" }}>
        최상의 인식률을 유지하기 위해 인식 초기에는 제공되는 가이드의 손모양과
        동일한 모양을 유지해주세요.
      </div>
      <div style={{ fontWeight: "bold" }}> STEP 2: 밝은 조명</div>
      <div style={{ marginBottom: "1rem" }}>
        어두운 환경에서는 인식률이 저하되거나, 원하는 결과물을 받지 못할 수
        있습니다. 밝은 조명아래서 서비스를 이용해주세요.
      </div>
      <div style={{ fontWeight: "bold" }}> STEP 3: 깨끗한 손상태</div>
      <div style={{ marginBottom: "1rem" }}>
        손톱에 이물질이나 잔여물들을 제거한 후 서비스를 이용해주세요. 이물질들에
        의해 방해가 생길 수 있고, 결과물을 제대로 표현하지 못할 가능성이
        있습니다.
      </div>
      <div
        style={{
          fontSize: "2rem",
          marginTop: "3rem",
          textAlign: "center",
          color: "red",
          textDecoration: "underline",
          cursor: "pointer",
          height: "4rem",
        }}
        onClick={() => window.open('https://3.34.140.229:8000/nail/client', 'AR 피팅 서비스', 'width=660, height=520, status=no, menubar=no, toolbar=no, resizable=no, directories=no, scrollbars=0, location=no')}
      >
        Try Virtual Try on Now
      </div>
    </div>
  );
};
export default ArCard;
