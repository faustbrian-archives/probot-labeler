import { Application, Context } from "probot";
import { ILabel } from "./interfaces";
import { loadConfig } from "./services/config";

const assignLabel = async (context: Context, levels: ILabel[], name: string): Promise<void> => {
	const { owner, repo } = context.repo();

	let issueNumber: number;

	if (context.payload.pull_request) {
		issueNumber = context.payload.pull_request.number;
	} else if (context.payload.issue) {
		issueNumber = context.payload.issue.number;
	}

	try {
		await context.github.issues.addLabels({
			owner,
			repo,
			issue_number: issueNumber,
			labels: [name],
		});
	} catch {
		// do nothing...
	}

	for (const level of levels) {
		try {
			if (level.label === name) {
				continue;
			}

			await context.github.issues.removeLabel({
				owner,
				repo,
				issue_number: issueNumber,
				name: level.label,
			});
		} catch {
			// do nothing...
		}
	}
};

const assignTopic = async (context: Context) => {
	let title: string;

	if (context.payload.pull_request) {
		title = context.payload.pull_request.title;
	} else if (context.payload.issue) {
		title = context.payload.issue.title;
	}

	const labeler = await loadConfig(context);

	for (const label of Object.values(labeler) as ILabel[]) {
		if (new RegExp(label.pattern).test(title)) {
			assignLabel(context, Object.values(labeler), label.label);
		}
	}
};

export = (robot: Application) => {
	robot.on(["issues.edited", "issues.opened", "issues.reopened"], assignTopic);
	robot.on(["pull_request.edited", "pull_request.opened", "pull_request.reopened"], assignTopic);
};
