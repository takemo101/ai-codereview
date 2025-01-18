type PrintEnvsOptions = {
  // 環墿変数のプレフィクスの指定
  prefix?: string;
};

const printEnvs = async (options: PrintEnvsOptions) => {
  const command = new Deno.Command("printenv");
  const { stdout } = await command.output();
  const decoded = new TextDecoder().decode(stdout);

  // 出力した環境変数文字列の変数名だけを取り出して配列にする
  const envs = decoded.split("\n").map((env) => env.split("=")[0]);

  // 配列を出力
  for (const env of envs) {
    if (options.prefix && !env.startsWith(options.prefix)) {
      continue;
    }

    console.log(env);
  }
};

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await printEnvs();
}
