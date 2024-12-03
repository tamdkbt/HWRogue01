import React from 'react';

const productSpecs = [
  { id: 'brand', label: 'Thương Hiệu', type: 'text' },
  { id: 'color', label: 'Màu Sắc', type: 'text' },
  { id: 'madeIn', label: 'Xuất Xứ', type: 'text' },
  { id: 'weight', label: 'Trọng Lượng (KG)', type: 'number', step: '0.1' },
  { id: 'length', label: 'Chiều Dài (CM)', type: 'number', step: '0.1' },
  { id: 'width', label: 'Chiều Rộng (CM)', type: 'number', step: '0.1' },
  { id: 'height', label: 'Chiều Cao (CM)', type: 'number', step: '0.1' },
  { id: 'steelNotes', label: 'Thông Số Thép', type: 'text' },
  { id: 'otherSpecs', label: 'Thông Số Khác', type: 'text' },
  { id: 'monsterLiteCompatible', label: 'Tương Thích Monster Lite', type: 'select', options: ['Có', 'Không'] }
];

export default function SpecsManager({ specs, onChange }) {
  const handleSpecChange = (specId, value) => {
    onChange({
      ...specs,
      [specId]: value
    });
  };

  return (
    <div className="bg-[#4A4A4A] rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold text-[#FFD700] mb-4">
        Thông Số Kỹ Thuật
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productSpecs.map((spec) => (
          <div key={spec.id} className="space-y-2">
            <label className="text-sm font-medium text-white">
              {spec.label}
            </label>
            
            {spec.type === 'select' ? (
              <select
                value={specs[spec.id] || ''}
                onChange={(e) => handleSpecChange(spec.id, e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded-md 
                  focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent 
                  focus:border-[#FFD700] transition-all duration-300"
              >
                <option value="">Chọn giá trị</option>
                {spec.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={spec.type}
                value={specs[spec.id] || ''}
                onChange={(e) => handleSpecChange(spec.id, e.target.value)}
                step={spec.step}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded-md 
                  focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent 
                  focus:border-[#FFD700] transition-all duration-300"
                placeholder={`Nhập ${spec.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
