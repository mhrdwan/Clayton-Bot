const fs = require("fs");
const api = require("./api/api");

let tokens = fs
  .readFileSync("token.txt", "utf-8")
  .split("\n")
  .map((token) => token.replace("\r", ""))
  .filter((token) => token.trim() !== "");

const DelayWaktu = (waktu) =>
  new Promise((resolve) => setTimeout(resolve, waktu));
async function tembak() {
  while (true) {
    for (let index = 0; index < tokens.length; index++) {
      const data = await api.login(tokens[index]);
      await DelayWaktu(1000);
      const status = await api.status(tokens[index]);
      await DelayWaktu(1000);
      const statusdailyClaim = await api.statusDailyClaim(tokens[index]);
      await DelayWaktu(1000);
      const questPartner = await api.questPartner(tokens[index]);
      await DelayWaktu(1000);
      const questFalse = questPartner?.filter(
        (item) => item.is_completed == false
      );
      if (questFalse.length > 0) {
        // console.log(
        //   `quest partner yang belum kelar ada`,
        //   questFalse.length,
        //   `di akun ke ${tokens[index]}`
        // );
        for (let indexs = 0; indexs < questFalse.length; indexs++) {
          // console.log(questFalse[indexs]);
          const tembakCompletee = await api.questPartnerComplete(
            tokens[index],
            questFalse[indexs].task_id
          );
          // console.log(tembakCompletee);
          const tembakCompleteRewardd = await api.questPartnerCompleteReward(
            tokens[index],
            questFalse[indexs].task_id
          );
          // console.log(tembakCompleteRewardd);
        }
      }

      console.table({
        no_akun: `${index + 1} / ${tokens.length}`,
        user: data?.user.first_name,
        claim: data?.user.active_farm,
        tokens: data?.user.tokens,
        availableTicket: data?.user?.daily_attempts,
        level: status.level,
        total_games: status.total_games,
        current_xp: status.current_xp,
        dailyClaims: statusdailyClaim.can_claim,
      });
      if (data?.user.active_farm) {
        console.log(`Akun ke ${index + 1} Sudah Farm`);
      } else {
        await api.farm(tokens[index]);
        console.log(`Akun ke ${index + 1} Belum Waktunya farm`);
      }
      if (data?.user?.daily_attempts > 0) {
        console.log("menajalankan game...");
        await api.gameStack(tokens[index]);
        console.log("Done Menjalankan Game...")
      } else {
        console.log("tiket sudah habis");
      }
      if (statusdailyClaim.can_claim) {
        console.log("Menjalankan Daily Claim");
        const dailyClaims = await api.dailyClaim(tokens[index]);
        console.log(dailyClaims);
      }
    }
    console.log("Menunggu 30s Untuk Memulai Kembali...");
    await DelayWaktu(30000);
  }
}

tembak();
