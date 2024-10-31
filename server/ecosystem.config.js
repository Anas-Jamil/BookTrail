module.exports = {
    apps: [
        {
            name: "booktrail-app",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
                ENV_VAR1: "enviorment-variable",
            },
        },
    ],
};