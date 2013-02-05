class Tag < ActiveRecord::Base
  attr_accessible :name
  has_many :todos

  def to_json(options = {})
    super(options.merge(:only => [ :id, :name ]))
  end
end
