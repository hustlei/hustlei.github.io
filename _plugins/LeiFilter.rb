  module LeiFilter
    def squeezenewline(input)
      input.gsub(/\r?\n\s*\r?\n/,"\n")
      #input.squeeze("\r\n")
    end
  end

Liquid::Template.register_filter(LeiFilter)