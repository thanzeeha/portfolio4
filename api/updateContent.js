import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(500).json({ error: "GITHUB_TOKEN not found" });
    }

    const { owner, repo, path, content, branch = "main", message = "Auto update" } = req.body;

    if (!owner || !repo || !path || !content) {
      return res.status(400).json({ error: "owner, repo, path, and content required" });
    }

    const getUrl = https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch};
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: Bearer ${token},
        Accept: "application/vnd.github.v3+json",
      },
    });

    let sha = null;
    if (getRes.ok) {
      const json = await getRes.json();
      sha = json.sha;
    }

    const putUrl = https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)};
    const body = {
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      sha,
    };

    const putRes = await fetch(putUrl, {
      method: "PUT",
      headers: {
        Authorization: Bearer ${token},
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const putJson = await putRes.json();

    if (!putRes.ok) {
      return res.status(putRes.status).json({ error: putJson });
    }

    return res.status(200).json({ success: true, commit: putJson.commit });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}