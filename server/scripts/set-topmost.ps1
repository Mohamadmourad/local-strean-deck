param([string]$WindowTitle)

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
    [DllImport("user32.dll")] public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
}
"@

$HWND_TOPMOST = [IntPtr]::new(-1)
$SWP_NOMOVE = 0x0002
$SWP_NOSIZE = 0x0001

$hwnd = [WinAPI]::GetForegroundWindow()
[WinAPI]::SetWindowPos($hwnd, $HWND_TOPMOST, 0, 0, 0, 0, $SWP_NOMOVE -bor $SWP_NOSIZE)
