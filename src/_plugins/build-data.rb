require 'net/http'
require 'json'
require 'digest/md5'

module Jekyll
  class APIRequestGenerator < Jekyll::Generator
    def initialize(config)
      @config = config
      @last_checksum = nil
    end

    def generate(site)
      current_checksum = Digest::MD5.hexdigest(File.read(__FILE__))

      if @last_checksum && current_checksum == @last_checksum
        Jekyll.logger.debug "Skipping API request generator, code has not changed."
        return
      end

      @last_checksum = current_checksum

      uri = URI("http://localhost:1337/api/blog-posts")
      response = Net::HTTP.get(uri)
      data = JSON.parse(response)

      file = File.open(site.source + "/_data/" + "api_data.json", 'w')
      file.puts(JSON.pretty_generate(data))
      file.close

      site.static_files << Jekyll::StaticFile.new(site, site.source, "/_data", "api_data.json")
    end
  end
end
