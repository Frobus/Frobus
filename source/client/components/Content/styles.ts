import styled, {styles} from "@utils/styled";

export default styles({
	Logo: styled`
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
	Aside: styled`
	`,
	Section: styled`
	`,
	ContentScroll: styled`
		overflow: auto;
	`,
	SectionHeader: styled`
		padding: 0;
	`,
	Footer: styled`
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
	Content: styled`
		padding: 24px;
	`,
	ContentInner: styled`
		background: #fff;
		padding: 24px;
	`,
	SectionHeaderLayout: styled`
		flex-direction: row;
		line-height: 64px;
	`,
	Lang: styled`
		line-height: 64px;
	`,
	SectionHeaderMenu: styled`
		line-height: 64px;
		flex-grow: 1;
	`,
});