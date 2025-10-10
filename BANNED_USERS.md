# Banned Users Guide

本指南说明如何封禁与解封用户，并介绍应用端行为。

## 前置条件
- 数据库 `profiles` 表包含 `is_banned BOOLEAN DEFAULT FALSE` 字段。
- 已应用最新 SQL（参考 `supabase/profiles_table.sql` 与 `supabase/messages_table.sql`）。

## 如何封禁用户
- 方式一：在 Supabase Dashboard 的 SQL Editor 执行：

```sql
-- 将 <USER_ID> 替换为用户的 auth.uid()
UPDATE public.profiles
SET is_banned = TRUE
WHERE id = '<USER_ID>';
```

- 方式二：在 Table Editor 打开 `profiles`，找到用户行，将 `is_banned` 勾选/设为 `TRUE` 并保存。

### 生效范围
- 中间件会在用户访问受保护页面时重定向到 `/banned`。
- 聊天输入与发送会被禁用。
- RLS 在 `messages` 表会阻止被封禁用户插入消息。

## 如何解封用户
- 在 SQL Editor 执行：

```sql
UPDATE public.profiles
SET is_banned = FALSE
WHERE id = '<USER_ID>';
```

- 或在 Table Editor 将 `is_banned` 设为 `FALSE`。

## 验证步骤
1. 在 `profiles` 中将目标用户 `is_banned` 改为 TRUE。
2. 打开应用，登录该用户：
   - 跳转到 `/banned` 页面；
   - 聊天输入框与发送按钮不可用；
   - 向 `messages` 插入失败（被 RLS 拒绝）。
3. 将 `is_banned` 改回 FALSE：
   - 能正常访问受保护页面；
   - 聊天输入与发送恢复正常。

## 注意事项
- 如果没有看到跳转或禁用效果，检查部署是否更新到最新版本。
- 若你在本地开发，确保 `.env` 和 Supabase 项目配置正确，且已运行最新 SQL 迁移。
- 管理员/服务端也可以封禁：在你的管理面板或 API 中执行上述 `UPDATE` 语句即可。