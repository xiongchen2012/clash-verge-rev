import { Box, ButtonGroup, IconButton, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useLockFn } from "ahooks";
import { useTranslation } from "react-i18next";
import { BasePage, DialogRef, Notice } from "@/components/base";
import {
  GitHub,
  Telegram,
  RocketLaunchOutlined,
  HelpOutlineOutlined,
} from "@mui/icons-material";
import { openWebUrl } from "@/services/cmds";
import SettingVergeBasic from "@/components/setting/setting-verge-basic";
import SettingVergeAdvanced from "@/components/setting/setting-verge-advanced";
import SettingClash from "@/components/setting/setting-clash";
import SettingSystem from "@/components/setting/setting-system";
import { useThemeMode } from "@/services/states";
// import { checkUpdate } from "@tauri-apps/api/updater";
import { version } from "@root/package.json";
import { useRef, useState } from "react";
import { UpdateViewer } from "@/components/setting/mods/update-viewer";

const SettingPage = () => {
  const { t } = useTranslation();
  const updateRef = useRef<DialogRef>(null);

  const onError = (err: any) => {
    Notice.error(err?.message || err.toString());
  };

  const toGithubRepo = useLockFn(() => {
    return openWebUrl("https://github.com/clash-verge-rev/clash-verge-rev");
  });

  const toGithubDoc = useLockFn(() => {
    return openWebUrl("https://clash-verge-rev.github.io/index.html");
  });

  const toTelegramChannel = useLockFn(() => {
    return openWebUrl("https://t.me/clash_verge_re");
  });

  const mode = useThemeMode();
  const isDark = mode === "light" ? false : true;

  const [loading, setLoading] = useState(false);
  // const onCheckUpdate = async () => {
  //   try {
  //     setLoading(true);
  //     const info = await checkUpdate().finally(() => setLoading(false));
  //     if (!info?.shouldUpdate) {
  //       Notice.success(t("Currently on the Latest Version"));
  //     } else {
  //       updateRef.current?.open();
  //     }
  //   } catch (err: any) {
  //     Notice.error(err.message || err.toString());
  //   }
  // };

  return (
    <>
      <UpdateViewer ref={updateRef} />
      <BasePage
        title={t("Settings")}
        subTitle={
          <span
            style={{ marginLeft: "8px", fontSize: "14px", fontWeight: "400" }}
          >
            {`v${version}`}
          </span>
        }
        header={
          <ButtonGroup variant="contained" aria-label="Basic button group">
            {/* <IconButton
              size="medium"
              color="inherit"
              title="检查更新"
              onClick={onCheckUpdate}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <RocketLaunchOutlined fontSize="inherit" />
              )}
            </IconButton> */}
            <IconButton
              size="medium"
              color="inherit"
              title={t("TG Channel")}
              onClick={toTelegramChannel}
            >
              <Telegram fontSize="inherit" />
            </IconButton>

            <IconButton
              size="medium"
              color="inherit"
              title={t("Github Repo")}
              onClick={toGithubRepo}
            >
              <GitHub fontSize="inherit" />
            </IconButton>
            <IconButton
              size="medium"
              color="inherit"
              title={t("Manual")}
              onClick={toGithubDoc}
            >
              <HelpOutlineOutlined fontSize="inherit" />
            </IconButton>
          </ButtonGroup>
        }
      >
        <Grid container spacing={1.5} columns={{ xs: 6, sm: 6, md: 12 }}>
        <Grid size={6}>
          <Box
            sx={{
              borderRadius: 2,
              marginBottom: 1.5,
              backgroundColor: isDark ? "#282a36" : "#ffffff",
            }}
          >
            <SettingSystem onError={onError} />
          </Box>
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: isDark ? "#282a36" : "#ffffff",
            }}
          >
            <SettingClash onError={onError} />
          </Box>
        </Grid>
        <Grid size={6}>
          <Box
            sx={{
              borderRadius: 2,
              marginBottom: 1.5,
              backgroundColor: isDark ? "#282a36" : "#ffffff",
            }}
          >
            <SettingVergeBasic onError={onError} />
          </Box>
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: isDark ? "#282a36" : "#ffffff",
            }}
          >
            <SettingVergeAdvanced onError={onError} />
          </Box>
        </Grid>
      </Grid>
      </BasePage>
    </>
  );
};

export default SettingPage;
