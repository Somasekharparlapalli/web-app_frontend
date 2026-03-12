import svgPaths from "./svg-piirm0ph81";

function ArrowLeft() {
  return (
    <div className="h-[19.996px] overflow-clip relative shrink-0 w-full" data-name="ArrowLeft">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.49863 13.3309">
            <path d={svgPaths.p1927d548} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3309 1.66636">
            <path d="M12.4977 0.833181H0.833181" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[35.97px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[7.987px] px-[7.987px] relative size-full">
        <ArrowLeft />
      </div>
    </div>
  );
}

function H() {
  return (
    <div className="content-stretch flex h-[27.983px] items-start relative shrink-0 w-full" data-name="h2">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[28px] min-h-px min-w-px not-italic relative text-[#1e2939] text-[20px]">Scan History</p>
    </div>
  );
}

function P() {
  return (
    <div className="content-stretch flex h-[16.013px] items-start relative shrink-0 w-full" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">{`Past dental scans & reports`}</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[43.996px] relative shrink-0 w-[143.978px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <H />
        <P />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[11.99px] h-[43.996px] items-center relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container2 />
    </div>
  );
}

function P1() {
  return (
    <div className="content-stretch flex h-[16.013px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px]">Total Scans</p>
    </div>
  );
}

function P2() {
  return (
    <div className="content-stretch flex h-[31.986px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[32px] min-h-px min-w-px not-italic relative text-[#155dfc] text-[24px]">12</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[3.983px] h-[75.962px] items-start left-0 pt-[11.99px] px-[11.99px] rounded-[14px] top-0 w-[166.304px]" data-name="Container">
      <P1 />
      <P2 />
    </div>
  );
}

function P3() {
  return (
    <div className="content-stretch flex h-[16.013px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px]">Improvement</p>
    </div>
  );
}

function TrendingDown() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="TrendingDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g clipPath="url(#clip0_273_418)" id="TrendingDown">
          <path d={svgPaths.pe0e0580} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p201ef3c0} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
        <defs>
          <clipPath id="clip0_273_418">
            <rect fill="white" height="15.9931" width="15.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function P4() {
  return (
    <div className="h-[31.986px] relative shrink-0 w-[45.51px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[32px] not-italic relative shrink-0 text-[#00a63e] text-[24px] whitespace-nowrap">15%</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[31.986px] items-center relative shrink-0 w-full" data-name="Container">
      <TrendingDown />
      <P4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[#f0fdf4] content-stretch flex flex-col gap-[3.983px] h-[75.962px] items-start left-[178.29px] pt-[11.99px] px-[11.99px] rounded-[14px] top-0 w-[166.304px]" data-name="Container">
      <P3 />
      <Container6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[75.962px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[185.225px] relative shrink-0 w-[392.597px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.275px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[15.993px] items-start pb-[1.275px] pt-[24px] px-[24px] relative size-full">
        <Container1 />
        <Container3 />
      </div>
    </div>
  );
}

function H1() {
  return (
    <div className="h-[19.996px] relative shrink-0 w-[80.443px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Recent Scans</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex h-[19.996px] items-center justify-between left-[24px] pr-[239.936px] top-[15.99px] w-[320.38px]" data-name="Container">
      <H1 />
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9963 19.9963">
        <g clipPath="url(#clip0_273_422)" id="FileText">
          <path d={svgPaths.pad50980} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d={svgPaths.p3e1e5700} id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M8.33181 7.49863H6.66545" id="Vector_3" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M13.3309 10.8313H6.66545" id="Vector_4" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M13.3309 14.1641H6.66545" id="Vector_5" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
        </g>
        <defs>
          <clipPath id="clip0_273_422">
            <rect fill="white" height="19.9963" width="19.9963" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#fef2f2] relative rounded-[10px] shrink-0 size-[39.993px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <FileText />
      </div>
    </div>
  );
}

function P5() {
  return (
    <div className="content-stretch flex h-[19.996px] items-start relative shrink-0 w-full" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] whitespace-nowrap">Dental Scan Report</p>
    </div>
  );
}

function Calendar() {
  return (
    <div className="relative shrink-0 size-[11.99px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9898 11.9898">
        <g clipPath="url(#clip0_273_443)" id="Calendar">
          <path d="M3.99661 0.999153V2.99746" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d="M7.99322 0.999153V2.99746" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d={svgPaths.p208ef500} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d="M1.49873 4.99576H10.4911" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
        </g>
        <defs>
          <clipPath id="clip0_273_443">
            <rect fill="white" height="11.9898" width="11.9898" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[16.013px] relative shrink-0 w-[65.147px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Jan 30, 2026</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[16.013px] items-center relative shrink-0 w-full" data-name="Container">
      <Calendar />
      <Span />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[36.009px] relative shrink-0 w-[118.245px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <P5 />
        <Container13 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[39.993px] relative shrink-0 w-[170.228px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.99px] items-center relative size-full">
        <Container11 />
        <Container12 />
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="ChevronRight">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9963 19.9963">
        <g id="ChevronRight">
          <path d={svgPaths.p31736cc0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
        </g>
      </svg>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute content-stretch flex h-[39.993px] items-center justify-between left-[17.27px] top-[17.27px] w-[285.844px]" data-name="div">
      <Container10 />
      <ChevronRight />
    </div>
  );
}

function Span1() {
  return (
    <div className="bg-[#ffe2e2] h-[23.98px] relative rounded-[42770700px] shrink-0 w-[75.504px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[37.99px] not-italic text-[#c10007] text-[12px] text-center top-[3.98px] whitespace-nowrap">Severe Risk</p>
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div className="bg-[#f3f4f6] h-[23.98px] relative rounded-[42770700px] shrink-0 w-[117.966px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[59.49px] not-italic text-[#364153] text-[12px] text-center top-[3.98px] whitespace-nowrap">Requires Treatment</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute content-stretch flex gap-[7.987px] h-[23.98px] items-center left-[17.27px] top-[69.25px] w-[285.844px]" data-name="div">
      <Span1 />
      <Span2 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[110.498px] relative rounded-[14px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.275px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Div1 />
      <Div2 />
    </div>
  );
}

function FileText1() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9963 19.9963">
        <g clipPath="url(#clip0_273_449)" id="FileText">
          <path d={svgPaths.pad50980} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d={svgPaths.p3e1e5700} id="Vector_2" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M8.33181 7.49863H6.66545" id="Vector_3" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M13.3309 10.8313H6.66545" id="Vector_4" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M13.3309 14.1641H6.66545" id="Vector_5" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
        </g>
        <defs>
          <clipPath id="clip0_273_449">
            <rect fill="white" height="19.9963" width="19.9963" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#fffbeb] relative rounded-[10px] shrink-0 size-[39.993px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <FileText1 />
      </div>
    </div>
  );
}

function P6() {
  return (
    <div className="content-stretch flex h-[19.996px] items-start relative shrink-0 w-full" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] whitespace-nowrap">Dental Scan Report</p>
    </div>
  );
}

function Calendar1() {
  return (
    <div className="relative shrink-0 size-[11.99px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9898 11.9898">
        <g clipPath="url(#clip0_273_443)" id="Calendar">
          <path d="M3.99661 0.999153V2.99746" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d="M7.99322 0.999153V2.99746" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d={svgPaths.p208ef500} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d="M1.49873 4.99576H10.4911" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
        </g>
        <defs>
          <clipPath id="clip0_273_443">
            <rect fill="white" height="11.9898" width="11.9898" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[16.013px] relative shrink-0 w-[65.147px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Jan 28, 2026</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[16.013px] items-center relative shrink-0 w-full" data-name="Container">
      <Calendar1 />
      <Span3 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[36.009px] relative shrink-0 w-[118.245px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <P6 />
        <Container17 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[39.993px] relative shrink-0 w-[170.228px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.99px] items-center relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function ChevronRight1() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="ChevronRight">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9963 19.9963">
        <g id="ChevronRight">
          <path d={svgPaths.p31736cc0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
        </g>
      </svg>
    </div>
  );
}

function Div3() {
  return (
    <div className="absolute content-stretch flex h-[39.993px] items-center justify-between left-[17.27px] top-[17.27px] w-[285.844px]" data-name="div">
      <Container14 />
      <ChevronRight1 />
    </div>
  );
}

function Span4() {
  return (
    <div className="bg-[#fef3c6] h-[23.98px] relative rounded-[42770700px] shrink-0 w-[92.154px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[45.99px] not-italic text-[#bb4d00] text-[12px] text-center top-[3.98px] whitespace-nowrap">Moderate Risk</p>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="bg-[#f3f4f6] h-[23.98px] relative rounded-[42770700px] shrink-0 w-[74.847px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[36.99px] not-italic text-[#364153] text-[12px] text-center top-[3.98px] whitespace-nowrap">In Progress</p>
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div className="absolute content-stretch flex gap-[7.987px] h-[23.98px] items-center left-[17.27px] top-[69.25px] w-[285.844px]" data-name="div">
      <Span4 />
      <Span5 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[110.498px] relative rounded-[14px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.275px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Div3 />
      <Div4 />
    </div>
  );
}

function FileText2() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9963 19.9963">
        <g clipPath="url(#clip0_273_411)" id="FileText">
          <path d={svgPaths.pad50980} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d={svgPaths.p3e1e5700} id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M8.33181 7.49863H6.66545" id="Vector_3" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M13.3309 10.8313H6.66545" id="Vector_4" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M13.3309 14.1641H6.66545" id="Vector_5" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
        </g>
        <defs>
          <clipPath id="clip0_273_411">
            <rect fill="white" height="19.9963" width="19.9963" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[10px] shrink-0 size-[39.993px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <FileText2 />
      </div>
    </div>
  );
}

function P7() {
  return (
    <div className="content-stretch flex h-[19.996px] items-start relative shrink-0 w-full" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] whitespace-nowrap">Dental Scan Report</p>
    </div>
  );
}

function Calendar2() {
  return (
    <div className="relative shrink-0 size-[11.99px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9898 11.9898">
        <g clipPath="url(#clip0_273_443)" id="Calendar">
          <path d="M3.99661 0.999153V2.99746" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d="M7.99322 0.999153V2.99746" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d={svgPaths.p208ef500} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d="M1.49873 4.99576H10.4911" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
        </g>
        <defs>
          <clipPath id="clip0_273_443">
            <rect fill="white" height="11.9898" width="11.9898" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[16.013px] relative shrink-0 w-[65.147px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Jan 25, 2026</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[16.013px] items-center relative shrink-0 w-full" data-name="Container">
      <Calendar2 />
      <Span6 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[36.009px] relative shrink-0 w-[118.245px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <P7 />
        <Container21 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[39.993px] relative shrink-0 w-[170.228px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.99px] items-center relative size-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function ChevronRight2() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="ChevronRight">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9963 19.9963">
        <g id="ChevronRight">
          <path d={svgPaths.p31736cc0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
        </g>
      </svg>
    </div>
  );
}

function Div5() {
  return (
    <div className="absolute content-stretch flex h-[39.993px] items-center justify-between left-[17.27px] top-[17.27px] w-[285.844px]" data-name="div">
      <Container18 />
      <ChevronRight2 />
    </div>
  );
}

function Span7() {
  return (
    <div className="bg-[#dcfce7] h-[23.98px] relative rounded-[42770700px] shrink-0 w-[64.052px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[32.49px] not-italic text-[#008236] text-[12px] text-center top-[3.98px] whitespace-nowrap">Mild Risk</p>
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div className="bg-[#f3f4f6] h-[23.98px] relative rounded-[42770700px] shrink-0 w-[72.078px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[35.99px] not-italic text-[#364153] text-[12px] text-center top-[3.98px] whitespace-nowrap">Monitored</p>
      </div>
    </div>
  );
}

function Div6() {
  return (
    <div className="absolute content-stretch flex gap-[7.987px] h-[23.98px] items-center left-[17.27px] top-[69.25px] w-[285.844px]" data-name="div">
      <Span7 />
      <Span8 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[110.498px] relative rounded-[14px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.275px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Div5 />
      <Div6 />
    </div>
  );
}

function FileText3() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9963 19.9963">
        <g clipPath="url(#clip0_273_449)" id="FileText">
          <path d={svgPaths.pad50980} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d={svgPaths.p3e1e5700} id="Vector_2" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M8.33181 7.49863H6.66545" id="Vector_3" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M13.3309 10.8313H6.66545" id="Vector_4" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
          <path d="M13.3309 14.1641H6.66545" id="Vector_5" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
        </g>
        <defs>
          <clipPath id="clip0_273_449">
            <rect fill="white" height="19.9963" width="19.9963" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[#fffbeb] relative rounded-[10px] shrink-0 size-[39.993px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <FileText3 />
      </div>
    </div>
  );
}

function P8() {
  return (
    <div className="absolute content-stretch flex h-[19.996px] items-start left-0 top-0 w-[118.245px]" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] whitespace-nowrap">Dental Scan Report</p>
    </div>
  );
}

function Calendar3() {
  return (
    <div className="relative shrink-0 size-[11.99px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9898 11.9898">
        <g clipPath="url(#clip0_273_443)" id="Calendar">
          <path d="M3.99661 0.999153V2.99746" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d="M7.99322 0.999153V2.99746" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d={svgPaths.p208ef500} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
          <path d="M1.49873 4.99576H10.4911" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999153" />
        </g>
        <defs>
          <clipPath id="clip0_273_443">
            <rect fill="white" height="11.9898" width="11.9898" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[16.013px] relative shrink-0 w-[65.147px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Jan 22, 2026</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex gap-[3.983px] h-[16.013px] items-center left-0 top-[20px] w-[118.245px]" data-name="Container">
      <Calendar3 />
      <Span9 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[36.009px] relative shrink-0 w-[118.245px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <P8 />
        <Container25 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[39.993px] relative shrink-0 w-[170.228px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.99px] items-center relative size-full">
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function ChevronRight3() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="ChevronRight">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9963 19.9963">
        <g id="ChevronRight">
          <path d={svgPaths.p31736cc0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66636" />
        </g>
      </svg>
    </div>
  );
}

function Div7() {
  return (
    <div className="absolute content-stretch flex h-[39.993px] items-center justify-between left-[17.27px] top-[17.27px] w-[285.844px]" data-name="div">
      <Container22 />
      <ChevronRight3 />
    </div>
  );
}

function Span10() {
  return (
    <div className="bg-[#fef3c6] h-[23.98px] relative rounded-[42770700px] shrink-0 w-[92.154px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[45.99px] not-italic text-[#bb4d00] text-[12px] text-center top-[3.98px] whitespace-nowrap">Moderate Risk</p>
      </div>
    </div>
  );
}

function Span11() {
  return (
    <div className="bg-[#f3f4f6] h-[23.98px] relative rounded-[42770700px] shrink-0 w-[55.169px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[27.99px] not-italic text-[#364153] text-[12px] text-center top-[3.98px] whitespace-nowrap">Treated</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div className="absolute content-stretch flex gap-[7.987px] h-[23.98px] items-center left-[17.27px] top-[69.25px] w-[285.844px]" data-name="div">
      <Span10 />
      <Span11 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[110.498px] relative rounded-[14px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.275px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Div7 />
      <Div8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.99px] h-[477.96px] items-start left-[24px] top-[51.98px] w-[320.38px]" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function TrendingUp() {
  return (
    <div className="absolute left-0 size-[15.993px] top-[1.99px]" data-name="TrendingUp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g clipPath="url(#clip0_273_437)" id="TrendingUp">
          <path d={svgPaths.p11f87980} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.pf3deac0} id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
        <defs>
          <clipPath id="clip0_273_437">
            <rect fill="white" height="15.9931" width="15.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function H2() {
  return (
    <div className="h-[19.996px] relative shrink-0 w-full" data-name="h3">
      <TrendingUp />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[23.98px] not-italic text-[#1e2939] text-[14px] top-[-1px] whitespace-nowrap">Progress Overview</p>
    </div>
  );
}

function Span12() {
  return (
    <div className="h-[16.013px] relative shrink-0 w-[77.695px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Risk Reduction</p>
      </div>
    </div>
  );
}

function Span13() {
  return (
    <div className="h-[16.013px] relative shrink-0 w-[27.545px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#00a63e] text-[12px] whitespace-nowrap">-15%</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex h-[16.013px] items-start justify-between left-0 top-0 w-[288.393px]" data-name="Container">
      <Span12 />
      <Span13 />
    </div>
  );
}

function Container30() {
  return <div className="bg-[#00c950] h-[7.987px] rounded-[42770700px] shrink-0 w-full" data-name="Container" />;
}

function Container29() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[7.987px] items-start left-0 pr-[86.518px] rounded-[42770700px] top-[20px] w-[288.393px]" data-name="Container">
      <Container30 />
    </div>
  );
}

function P9() {
  return (
    <div className="absolute h-[32.026px] left-0 top-[35.97px] w-[288.393px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] top-0 w-[279px]">Your oral health has improved by 15% over the last 3 months</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[67.996px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
      <P9 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.99px] h-[131.968px] items-start left-[24px] pt-[15.993px] px-[15.993px] rounded-[14px] top-[553.94px] w-[320.38px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.613deg, rgb(239, 246, 255) 0%, rgb(240, 253, 244) 100%)" }}>
      <H2 />
      <Container27 />
    </div>
  );
}

function Download() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Download">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g id="Download">
          <path d={svgPaths.p1b491500} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p18a93600} id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d="M7.99654 9.99568V1.99914" id="Vector_3" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
      </svg>
    </div>
  );
}

function Span14() {
  return (
    <div className="h-[19.996px] relative shrink-0 w-[133.74px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#2b7fff] text-[14px] text-center whitespace-nowrap">Download All Reports</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[7.987px] h-[50.509px] items-center justify-center left-[24px] pl-[1.275px] pr-[1.295px] py-[1.275px] rounded-[14px] top-[701.9px] w-[320.38px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#2b7fff] border-[1.275px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Download />
      <Span14 />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[392.597px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container8 />
        <Container9 />
        <Container26 />
        <Button5 />
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[851.477px] items-start left-0 overflow-clip top-0 w-[392.597px]" data-name="div">
      <Container />
      <Container7 />
    </div>
  );
}

function MessageCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="MessageCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9996 23.9996">
        <g id="MessageCircle">
          <path d={svgPaths.p1023c700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99997" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[#2b7fff] content-stretch flex items-center justify-center left-[312.61px] rounded-[42770700px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[55.986px] top-[699.49px]" data-name="button">
      <MessageCircle />
    </div>
  );
}

export default function New() {
  return (
    <div className="bg-white relative size-full" data-name="new">
      <Div />
      <Button6 />
    </div>
  );
}