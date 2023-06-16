e
<!--
 * @Author: hxz
 * @Date: 2023-06-08 15:52:54
 * @LastEditors: hxz
 * @LastEditTime: 2023-06-16 09:40:13
 * @Description: 
-->
<template>
	<div class="page">
		<van-sidebar class="sidebar" v-model="activeMain" @change="changeMain">
			<van-sidebar-item v-for="(item, index) in mainList" :key="index" :title="item.name" />
		</van-sidebar>
		<div class="content">
			<div class="sub">
				<span
					v-for="item in subList"
					:key="item.value"
					:class="{ active: activeSub === item.value }"
					@click="changSub(item.value)"
				>
					{{ item.name }}
				</span>
			</div>
			<van-divider class="divider" />
			<div class="wrap">
				<van-pull-refresh class="list" v-model="refreshing" @refresh="onRefresh">
					<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<div class="total">共{{ total }}个专栏</div>
						<div class="block" v-for="item in list" :key="item.id">
							<div class="item" @click="navToDetail(item.columnId)">
								<img class="poster" :src="item.indexCover + '?x-image-process=image/resize,m_lfit,w_260'" />
								<div class="item-right">
									<div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
									<van-tag v-if="item.tags.length" color="#EDEFF7" text-color="#808080">
										{{ item.tags[0].tagName }}
									</van-tag>
									<van-tag v-else color="#EDEFF7" text-color="#808080">{{ item.universityName }}</van-tag>
								</div>
							</div>
							<van-divider />
						</div>
					</van-list>
				</van-pull-refresh>
			</div>
		</div>
	</div>
</template>

<script>
import { Sidebar, SidebarItem, Divider, List, PullRefresh, Tag } from 'vant';
import { ListData, Category } from '../mock/mock';

export default {
	components: {
		vanSidebar: Sidebar,
		vanSidebarItem: SidebarItem,
		vanDivider: Divider,
		vanList: List,
		vanPullRefresh: PullRefresh,
		vanTag: Tag,
	},
	data() {
		return {
			mainList: [],
			activeMain: 0,
			subList: [
				{ name: '全部', value: '' },
				{ name: '零基础', value: 0 },
				{ name: '初级', value: 1 },
				{ name: '中级', value: 2 },
				{ name: '高级', value: 3 },
			],
			activeSub: '',
			list: [],
			loading: false,
			finished: false,
			refreshing: false,
			total: 0,
		};
	},

	created() {
		this.init();
	},
	methods: {
		init() {
			this.mainList = Category.dataList;
			this.changeMain();
		},
		changeMain() {
			this.changSub('');
		},
		changSub(val) {
			this.activeSub = val;
			this.loading = true;
			this.refreshing = true;
			this.finished = false;
			this.onLoad();
		},
		onLoad() {
			setTimeout(() => {
				let res = ListData;
				if (this.refreshing) {
					this.list = [];
					this.refreshing = false;
				}
				this.list.push(...res.dataList);
				this.loading = false;
				if (this.list.length >= res.total) {
					this.finished = true;
				}
				this.total = res.total;
			}, 200);
		},
		onRefresh() {
			// 清空列表数据
			this.finished = false;
			// 重新加载数据
			// 将 loading 设置为 true，表示处于加载状态
			this.loading = true;
			this.onLoad();
		},
		navToDetail(columnId) {},
	},
};
</script>

<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	align-items: stretch;

	.sidebar {
		flex: 1;
		background: #f7f8fa;
		position: relative;
	}

	.content {
		flex: 3;

		.sub {
			height: 120px;
			display: flex;
			justify-content: space-around;
			line-height: 120px;
			font-weight: 400;
			font-size: 32px;
			color: #666666;
			margin-left: 30px;

			.active {
				font-weight: 500;
				color: #f2323a;
			}
		}

		.divider {
			margin-top: 0;
			margin-left: 30px;
		}

		.wrap {
			position: relative;
			overflow-y: scroll;
			height: calc(100vh - 150px);
			padding-left: 30px;

			.total {
				font-weight: 400;
				font-size: 28px;
				color: #666666;
				margin-bottom: 30px;
			}

			.block {
				padding-right: 30px;
			}

			.item {
				position: relative;
				display: flex;

				.poster {
					width: 260px;
					height: 146px;
					border-radius: 10px;
				}

				.discount {
					width: 118px;
					height: 46px;
					position: absolute;
					left: 0;
					top: 0;
				}

				.free {
					width: 110px;
					height: 46px;
					position: absolute;
					left: 0;
					top: 0;
				}

				.item-right {
					flex: 1;
					margin-left: 16px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;

					.title {
						font-weight: 400;
						font-size: 32px;
						color: #3a3a3a;
						line-height: 48px;
					}
				}
			}
		}
	}
}
</style>
