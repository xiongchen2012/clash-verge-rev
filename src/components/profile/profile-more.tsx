import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLockFn } from "ahooks";
import {
  Box,
  Badge,
  Chip,
  Typography,
  MenuItem,
  Menu,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { FeaturedPlayListRounded } from "@mui/icons-material";
import { viewProfile, readProfileFile, saveProfileFile } from "@/services/cmds";
import { Notice } from "@/components/base";
import { EditorViewer } from "@/components/profile/editor-viewer";
import { ProfileBox } from "./profile-box";
import { LogViewer } from "./log-viewer";

interface Props {
  logInfo?: [string, string][];
  id: "Merge" | "Script";
  onSave?: (prev?: string, curr?: string) => void;
}

// profile enhanced item
export const ProfileMore = (props: Props) => {
  const { id, logInfo = [], onSave } = props;

  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [fileOpen, setFileOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  const onEditFile = () => {
    setAnchorEl(null);
    setFileOpen(true);
  };

  const onOpenFile = useLockFn(async () => {
    setAnchorEl(null);
    try {
      await viewProfile(id);
    } catch (err: any) {
      Notice.error(err?.message || err.toString());
    }
  });

  const fnWrapper = (fn: () => void) => () => {
    setAnchorEl(null);
    return fn();
  };

  const hasError = !!logInfo.find((e) => e[0] === "exception");

  const itemMenu = [
    { label: "Edit File", handler: onEditFile },
    { label: "Open File", handler: onOpenFile },
  ];

  const boxStyle = {
    height: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    lineHeight: 1,
  };

  return (
    <>
      <ProfileBox
        onDoubleClick={onEditFile}
        onContextMenu={(event) => {
          const { clientX, clientY } = event;
          setPosition({ top: clientY, left: clientX });
          setAnchorEl(event.currentTarget);
          event.preventDefault();
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={0.5}
        >
          <Typography
            width="calc(100% - 52px)"
            variant="h6"
            component="h2"
            noWrap
            title={t(`Global ${id}`)}
          >
            {t(`Global ${id}`)}
          </Typography>

          <Chip
            label={id}
            color="primary"
            size="small"
            variant="outlined"
            sx={{ height: 20, textTransform: "capitalize" }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span style={{ fontSize: 12 }}>双击可编辑</span>
          {id === "Script" ? (
            <SvgIcon sx={{ fontSize: 16 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
              >
                <g fill="none">
                  <rect width="256" height="256" fill="#F0DB4F" rx="60" />
                  <path
                    fill="#323330"
                    d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.579c-17.357-7.388-28.871-16.668-28.871-36.258c0-18.044 13.748-31.792 35.229-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.139 14.778 14.608l6.014 2.577c20.449 8.765 31.963 17.699 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574"
                  />
                </g>
              </svg>
            </SvgIcon>
          ) : (
            <SvgIcon sx={{ fontSize: 16 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 128 128"
              >
                <path d="M22.254 39.778L.5 5.629h15.69l13.833 21.989L43.968 5.629h15.02L36.214 39.778v21.65h-13.96z" />
                <path
                  fill="#cb171e"
                  d="M82.428 49.149H57.162l-5.139 12.408H40.835l23.66-55.798h11.443l22.7 55.798H86.68zm-4.197-11.14l-7.745-20.476l-8.642 20.476z"
                />
                <path d="M22.254 67.686v54.688h11.733V84.65l12.28 25.356h9.236l12.7-26.246v38.601h11.256V67.686H64.09l-13.638 24.73l-12.988-24.73zm105.248 42.804H98.639V67.67H86.682v54.455h40.82z" />
              </svg>
            </SvgIcon>
          )}
        </Box>

        <Box sx={boxStyle}>
          {id === "Script" &&
            (hasError ? (
              <Badge color="error" variant="dot" overlap="circular">
                <IconButton
                  size="small"
                  edge="start"
                  color="error"
                  title={t("Script Console")}
                  onClick={() => setLogOpen(true)}
                >
                  <FeaturedPlayListRounded fontSize="inherit" />
                </IconButton>
              </Badge>
            ) : (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                title={t("Script Console")}
                onClick={() => setLogOpen(true)}
              >
                <FeaturedPlayListRounded fontSize="inherit" />
              </IconButton>
            ))}
        </Box>
      </ProfileBox>

      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorPosition={position}
        anchorReference="anchorPosition"
        transitionDuration={225}
        MenuListProps={{ sx: { py: 0.5 } }}
        onContextMenu={(e) => {
          setAnchorEl(null);
          e.preventDefault();
        }}
      >
        {itemMenu
          .filter((item: any) => item.show !== false)
          .map((item) => (
            <MenuItem
              key={item.label}
              onClick={item.handler}
              sx={[
                { minWidth: 120 },
                (theme) => {
                  return {
                    color:
                      item.label === "Delete"
                        ? theme.palette.error.main
                        : undefined,
                  };
                },
              ]}
              dense
            >
              {t(item.label)}
            </MenuItem>
          ))}
      </Menu>
      {fileOpen && (
        <EditorViewer
          open={true}
          title={`${t("Global " + id)}`}
          initialData={readProfileFile(id)}
          language={id === "Merge" ? "yaml" : "javascript"}
          schema={id === "Merge" ? "clash" : undefined}
          onSave={async (prev, curr) => {
            await saveProfileFile(id, curr ?? "");
            onSave && onSave(prev, curr);
          }}
          onClose={() => setFileOpen(false)}
        />
      )}
      {logOpen && (
        <LogViewer
          open={logOpen}
          logInfo={logInfo}
          onClose={() => setLogOpen(false)}
        />
      )}
    </>
  );
};
