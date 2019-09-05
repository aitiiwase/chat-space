class Member < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :group
end
