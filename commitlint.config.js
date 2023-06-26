module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'body-case': [2, 'always', 'sentence-case'],
    'body-max-line-length': [1, 'always', 72],
    'header-max-length': [1, 'always', 52],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'change',
        'chore',
        'ci',
        'config',
        'data',
        'deprecate',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'remove',
        'revert',
        'security',
        'style',
        'test',
      ],
    ],
  },
  prompt: {
    settings: {},
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'Introduce new features',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Fix a bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Add or update documentation',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description:
              'Changes that do not affect the meaning of the code (e.g., whitespaces, formatting, missing semi-colons, etc.)',
            title: 'Coding Styles',
            emoji: '💎',
          },
          refactor: {
            description:
              'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'Improve performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Adds missing tests or corrects existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          data: {
            description:
              'Perform database related changes or add seed/test data',
            title: 'Data',
            emoji: '🗃️',
          },
          config: {
            description: 'Add or update configuration files',
            title: 'Configuration',
            emoji: '🔧',
          },
          build: {
            description:
              'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              'Changes to our CI configuration files and scripts (example scopes: GitHub Actions, Azure Pipelines, Travis, CircleCI, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '⏪️',
          },
          change: {
            description: 'Changes in existing functionality',
            title: 'Change Requests',
            emoji: '🦋',
          },
          deprecate: {
            description: 'Soon-to-be removed features',
            title: 'Deprecations',
            emoji: '👎',
          },
          remove: {
            description: 'Soon-to-be removed features',
            title: 'Removed Features',
            emoji: '🗑',
          },
          security: {
            description: 'Fixes security issues and vulnerabilities',
            title: 'Security',
            emoji: '🔒️',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
