const core = require('@actions/core')
const http = require('@actions/http-client')
const FormData = require("form-data")
const fs = require("fs")

MOD_PORTAL_URL = "https://mods.factorio.com"
INIT_UPLOAD_URL = `${MOD_PORTAL_URL}/api/v2/mods/releases/init_upload`

try {
  const modname = core.getInput('mod-name')
  const client = new http.HttpClient()
  // start init upload
  client.post(INIT_UPLOAD_URL,
    `mod=${modname}`,
    { "Authorization": `Bearer ${process.env.FACTORIO_MODS_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded" }
  ).then(async res => {
    // if error, throw
    if (res.message.statusCode != 200) {
      throw new Error(`Failed to initialize upload: ${await res.readBody()}`)
    }
    return JSON.parse(await res.readBody()).upload_url
  })
  .then(upload_url => {
    // mask upload_url as a secret
    core.setSecret(upload_url)
    // prep for upload
    const fileData = new FormData()
    fileData.append("file", fs.createReadStream(process.env.FILENAME))
    // upload
    return client.post(upload_url, fileData, fileData.getHeaders())
  }).then(async res => {
    if (res.message.statusCode != 200) {
      throw new Error(`Failed to upload file: ${await res.readBody()}`)
    }
  })
} catch (error) {
  core.setFailed(error.message)
}