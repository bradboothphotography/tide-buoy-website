#!/bin/sh
set -eu

FRAMEWORK_NAMES="GoogleMobileAds UserMessagingPlatform"

generate_dsym() {
  framework_binary="$1"
  output_dir="$2"
  framework_bundle_name="$(basename "$(dirname "$framework_binary")")"
  dsym_path="${output_dir}/${framework_bundle_name}.dSYM"

  mkdir -p "$output_dir"
  rm -rf "$dsym_path"

  xcrun dsymutil -o "$dsym_path" "$framework_binary"
}

patch_archive() {
  archive_path="$1"
  app_path="${archive_path}/Products/Applications/${WRAPPER_NAME:-Tide Buoy.app}"
  frameworks_dir="${app_path}/Frameworks"
  output_dir="${archive_path}/dSYMs"

  if [ ! -d "$frameworks_dir" ]; then
    echo "No Frameworks directory found at ${frameworks_dir}" >&2
    exit 1
  fi

  for framework_name in $FRAMEWORK_NAMES; do
    framework_binary="${frameworks_dir}/${framework_name}.framework/${framework_name}"
    if [ -f "$framework_binary" ]; then
      generate_dsym "$framework_binary" "$output_dir"
    fi
  done
}

patch_current_build() {
  frameworks_dir="${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
  output_dir="${DWARF_DSYM_FOLDER_PATH}"

  if [ ! -d "$frameworks_dir" ]; then
    exit 0
  fi

  for framework_name in $FRAMEWORK_NAMES; do
    framework_binary="${frameworks_dir}/${framework_name}.framework/${framework_name}"
    if [ -f "$framework_binary" ]; then
      generate_dsym "$framework_binary" "$output_dir"
    fi
  done
}

if [ "${1:-}" != "" ]; then
  patch_archive "$1"
else
  patch_current_build
fi
