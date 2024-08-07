const fs = require('fs').promises // Use fs.promises for async file operations
const path = require('path')
const logger = require('./logger')
    // Define the XML content
const xmlContent = `<?xml version="1.0" standalone="yes"?>
<IOTConfig version="1.0.0">
  <IPConfig>
    <address />
    <subnetmask />
    <gateway />
    <dns />
    <unitmask enable="true" default="1" minimum="0" maximum="255" shift="8" />
    <carmask enable="false" default="0" minimum="0" maximum="255" shift="0" />
  </IPConfig>

  <Device_list>
    <Ipaddress ip="192.168.0.243" aliance_name="coach 243" />
    <Ipaddress ip="192.168.0.0" aliance_name="coach 0"/>
    <Ipaddress ip="192.168.0.2" aliance_name="coach 2"/>
    <Ipaddress ip="192.168.0.3" aliance_name="coach 3"/>
    <Ipaddress ip="192.168.0.4" aliance_name="coach 4"/>
    <Ipaddress ip="192.168.0.5" aliance_name="coach 5"/>
    <Ipaddress ip="192.168.0.6" aliance_name="coach 6"/>
    <Ipaddress ip="192.168.0.7" aliance_name="coach 7"/>
    <Ipaddress ip="192.168.0.8" aliance_name="coach 8"/>
    <Ipaddress ip="192.168.0.9" aliance_name="coach 9"/>
    <Ipaddress ip="192.168.0.10" aliance_name="coach 10"/>
    <Ipaddress ip="192.168.0.11" aliance_name="coach 11"/>
    <Ipaddress ip="192.168.0.12" aliance_name="coach 12"/>
    <Ipaddress ip="192.168.0.13" aliance_name="coach 13"/>
    <Ipaddress ip="192.168.0.14" aliance_name="coach 14"/>
  </Device_list>

  <DATA_STRUCTURE>
    <ADD folder_name="Add" folder_url="/usr/share/apache2/htdocs/content/add" />
    <ADD2 folder_name="Add2" folder_url="/usr/share/apache2/htdocs/content/add2" />
    <ADVERTISMENT folder_name="Advertisment" folder_url="/usr/share/apache2/htdocs/content/advertisment" />

    <IMG folder_name="Img" folder_url="/usr/share/apache2/htdocs/content/img">
      <TOURIST Img_Sub_folder_name="Tourist" Img_Sub_folder_url="/usr/share/apache2/htdocs/content/img/tourist" />
      <HOME Img_Sub_folder_name="Home" Img_Sub_folder_url="/usr/share/apache2/htdocs/content/img/home" />
    </IMG>

    <KIDSZONE folder_name="Kidszone" folder_url="/usr/share/apache2/htdocs/content/kidszone">
      <TYPE1 Kidszone_Sub_folder_name="Type1" Kidszone_Sub_folder_url="/usr/share/apache2/htdocs/content/kidszone/type1" />
      <TYPE2 Kidszone_Sub_folder_name="Type2" Kidszone_Sub_folder_url="/usr/share/apache2/htdocs/content/kidszone/type2" />
      <TYPE3 Kidszone_Sub_folder_name="Type3" Kidszone_Sub_folder_url="/usr/share/apache2/htdocs/content/kidszone/type3" />
      <TYPE4 Kidszone_Sub_folder_name="Type4" Kidszone_Sub_folder_url="/usr/share/apache2/htdocs/content/kidszone/type4" />
    </KIDSZONE>

    <MOVIES folder_name="Movies" folder_url="/usr/share/apache2/htdocs/content/movies">
      <BOLLYWOOD Movies_Sub_folder_name="Bollywood" Movies_Sub_folder_url="/usr/share/apache2/htdocs/content/movies/bollywood" />
      <HOLLYWOOD Movies_Sub_folder_name="Hollywood" Movies_Sub_folder_url="/usr/share/apache2/htdocs/content/movies/hollywood" />
      <regional1 Movies_Sub_folder_name="Regional1" Movies_Sub_folder_url="/usr/share/apache2/htdocs/content/movies/regional1" />
      <regional2 Movies_Sub_folder_name="Regional2" Movies_Sub_folder_url="/usr/share/apache2/htdocs/content/movies/regional2" />
    </MOVIES>

    <MUSIC folder_name="Music" folder_url="/usr/share/apache2/htdocs/content/music">
      <ENGLISH Music_Sub_folder_name="english" Music_Sub_folder_url="/usr/share/apache2/htdocs/content/music/english" />
      <HINDI Music_Sub_folder_name="hindi" Music_Sub_folder_url="/usr/share/apache2/htdocs/content/music/hindi" />
      <regional1 Music_Sub_folder_name="Regional1" Music_Sub_folder_url="/usr/share/apache2/htdocs/content/music/regional1" />
      <regional2 Music_Sub_folder_name="Regional2" Music_Sub_folder_url="/usr/share/apache2/htdocs/content/music/regional2" />
    </MUSIC>

    <POSTER folder_name="Poster" folder_url="/usr/share/apache2/htdocs/content/poster">
      <POSTER_KIDSZONE Poster_Sub_folder_name="kidszone" Poster_Sub_folder_url="/usr/share/apache2/htdocs/content/poster/kidszone">
        <POSTER_TYPE1 Kidszone_Sub_folder_name2="type1" Kidszone_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/kidszone/type1" />
        <POSTER_TYPE2 Kidszone_Sub_folder_name2="type2" Kidszone_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/kidszone/type2" />
        <POSTER_TYPE3 Kidszone_Sub_folder_name2="type3" Kidszone_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/kidszone/type3" />
        <POSTER_TYPE4 Kidszone_Sub_folder_name2="Type4" Kidszone_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/kidszone/type4" />
      </POSTER_KIDSZONE>

      <POSTER_MOVIES Poster_Sub_folder_name="movies" Poster_Sub_folder_url="/usr/share/apache2/htdocs/content/poster/movies">
        <POSTER_BOLLYWOOD Movies_Sub_folder_name2="bollywood" Movies_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/movies/bollywood" />
        <POSTER_HOLLYWOOD Movies_Sub_folder_name2="hollywood" Movies_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/movies/hollywood" />
        <POSTER_regional1 Movies_Sub_folder_name2="regional1" Movies_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/movies/regional1" />
        <POSTER_regional2 Movies_Sub_folder_name2="regional2" Movies_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/movies/regional2" />
      </POSTER_MOVIES>

      <POSTER_VIDEOS Poster_Sub_folder_name="videos" Poster_Sub_folder_url="/usr/share/apache2/htdocs/content/poster/videos">
        <POSTER_ENGLISH Videos_Sub_folder_name2="english" Videos_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/videos/english" />
        <POSTER_HINDI Videos_Sub_folder_name2="hindi" Videos_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/videos/hindi" />
        <POSTER_regional1 Videos_Sub_folder_name2="regional1" Videos_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/videos/regional1" />
        <POSTER_regional2 Videos_Sub_folder_name2="regional2" Videos_Sub_folder_url2="/usr/share/apache2/htdocs/content/poster/videos/regional2" />
      </POSTER_VIDEOS>
    </POSTER>

    <VIDEOS folder_name="Videos" folder_url="/usr/share/apache2/htdocs/content/videos">
      <ENGLISH Videos_Sub_folder_name="english" Videos_Sub_folder_url="/usr/share/apache2/htdocs/content/videos/english" />
      <HINDI Videos_Sub_folder_name="hindi" Videos_Sub_folder_url="/usr/share/apache2/htdocs/content/videos/hindi" />
      <regional1 Videos_Sub_folder_name="Regional1" Videos_Sub_folder_url="/usr/share/apache2/htdocs/content/videos/regional1" />
      <regional2 Videos_Sub_folder_name="Regional2" Videos_Sub_folder_url="/usr/share/apache2/htdocs/content/videos/regional2" />
    </VIDEOS>
  </DATA_STRUCTURE>
</IOTConfig>`

// Define the function to check file existence and create if not present
async function createFileIfNotExists(filePath) {
    try {
        // Check if the file exists
        logger.info(`createFileIfNotExists: Checking file at ${filePath}`)
        try {
            await fs.access(filePath)
            logger.info(`createFileIfNotExists: File already exists at ${filePath}`)
        } catch (err) {
            // File does not exist, create it
            await fs.writeFile(filePath, xmlContent, 'utf8')
            logger.info(`createFileIfNotExists: File created at ${filePath}`)
        }
    } catch (error) {
        logger.error(`createFileIfNotExists: Error: ${error}`)
    }
}

// Usage

module.exports = { createFileIfNotExists }