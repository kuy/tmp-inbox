#\ -w -o 0.0.0.0 -p 4567

require 'rubygems'
require 'json'
require 'nkf'
require 'fssm'
require 'sinatra'
require "sinatra/reloader"

t = Thread.new do
  puts "Start monitoring"
  FSSM.monitor('/tmp/mails', '**/*') do
    update {|base, relative| puts "UP #{base}, #{relative}"}
    delete {|base, relative| puts "DEL #{base}, #{relative}"}
    create {|base, relative| puts "CREATE #{base}, #{relative}"}
  end
end

set :static, true
set :public_folder, 'public'
enable :reloader

require './lib/app'
run Sinatra::Application
