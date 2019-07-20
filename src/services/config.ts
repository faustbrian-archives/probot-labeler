import { getConfig } from "@botamic/toolkit";
import Joi from "@hapi/joi";
import { Context } from "probot";

export const loadConfig = async (context: Context): Promise<Record<string, any>> =>
	getConfig(
		context,
		Joi.object({
			labeler: Joi.object()
				.pattern(
					Joi.string(),
					Joi.object({
						pattern: Joi.string(),
						label: Joi.string(),
					}),
				)
				.default({
					feat: {
						pattern: "feat:|feat(.*):",
						label: "Type: Feature",
					},
					fix: {
						pattern: "fix:|fix(.*):",
						label: "Type: Bugfix",
					},
					polish: {
						pattern: "polish:|polish(.*):",
						label: "Type: Polish",
					},
					docs: {
						pattern: "docs:|docs(.*):",
						label: "Type: Documentation",
					},
					style: {
						pattern: "style:|style(.*):",
						label: "Type: Style",
					},
					refactor: {
						pattern: "refactor:|refactor(.*):",
						label: "Type: Refactor",
					},
					perf: {
						pattern: "perf:|perf(.*):",
						label: "Type: Performance",
					},
					test: {
						pattern: "test:|test(.*):",
						label: "Type: Test",
					},
					workflow: {
						pattern: "workflow:|workflow(.*):",
						label: "Type: Workflow",
					},
					ci: {
						pattern: "ci:|ci(.*):",
						label: "Type: Continuous Integration",
					},
					chore: {
						pattern: "chore:|chore(.*):",
						label: "Type: Chore",
					},
					types: {
						pattern: "types:|types(.*):",
						label: "Type: Types",
					},
					release: {
						pattern: "release:|release(.*):",
						label: "Type: Release",
					},
				}),
		})
			.unknown(true)
			.default(),
	);
