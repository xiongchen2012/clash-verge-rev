import {
  Box,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
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
import SettingVerge from "@/components/setting/setting-verge";
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
        <Grid container spacing={{ xs: 1.5, lg: 1.5 }}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: isDark ? "#282a36" : "#ffffff",
              }}
            >
              <SettingVerge onError={onError} />
            </Box>
          </Grid>
        </Grid>
      </BasePage>
    </>
  );
};

export default SettingPage;
