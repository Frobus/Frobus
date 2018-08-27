import styled from "styled-components";

export default function _styled({Aside, Section, Logo, ContentScroll, SectionHeader, Footer, Content, ContentInner, ...elements}): any{
	return {
		Logo: styled(Logo)`
			color: #fff;
			height: 64px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			text-align: left;
			font-size: 30px;
			line-height: 1.2;
			font-weight: 100;
			text-transform: lowercase;
			padding-left: 24px;
		`,
		Aside: styled(Aside)`
		`,
		Section: styled(Section)`
		`,
		ContentScroll: styled(ContentScroll)`
			overflow: auto;
		`,
		SectionHeader: styled(SectionHeader)`
			/* background: #fff; */
		`,
		Footer: styled(Footer)`
			display: flex;
			> * {
				flex-grow: 1;
				text-align: center;
				padding: 0 10px;
			}
			> *:first-of-type {
				text-align: left;
				padding-left: 0;
			}
			> *:last-of-type {
				text-align: right;
				padding-right: 0;
			}
		`,
		Content: styled(Content)`
			padding: 24px;
		`,
		ContentInner: styled(ContentInner)`
			background: #fff;
			padding: 24px;
		`,
		...elements
	}
}