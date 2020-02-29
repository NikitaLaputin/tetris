import React, { memo } from "react";
import { version } from "../../../package.json";

import styles from "./styles.module.css";

const Version = () => <div className={styles.version}>v{version}</div>;

export default memo(Version);
