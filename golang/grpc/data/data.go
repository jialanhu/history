package data

import (
	"path/filepath"
	"runtime"
)

var basepath string

func init() {
	_, currentFile, _, _ := runtime.Caller(0)
	basepath = filepath.Dir(currentFile)
}

func Path(rel string) string {
	if filepath.IsAbs(rel) { // 若是绝对路径则原样返回
		return rel
	}
	return filepath.Join(basepath, rel)
}
